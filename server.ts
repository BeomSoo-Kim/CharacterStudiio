/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3000;

// Base64 이미지 수신 등을 위해 요청 크기 한도를 넉넉하게 상향 (15MB)
app.use(express.json({ limit: "15mb" }));
app.use(express.urlencoded({ limit: "15mb", extended: true }));

// 1. Gemini Client lazy-initialization 도구 (안정적인 구동 보장)
function getGeminiClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === "MY_GEMINI_API_KEY" || apiKey.trim() === "") {
    return null;
  }
  try {
    return new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  } catch (error) {
    console.error("Gemini SDK 초기화 실패:", error);
    return null;
  }
}

// 2. 가상의 이미지 생성 실패율을 가미한 분기 제어 및 실제 Gemini 연동 수립 API
app.post("/api/generate", async (req, res) => {
  const { uploadedImage, selectedStyle, moodOption, poseOption, simulateError } = req.body;

  // 필수값 검증
  if (!uploadedImage || !selectedStyle) {
    return res.status(400).json({
      success: false,
      message: "원본 사진과 캐릭터 스타일은 필수 입력 사항입니다."
    });
  }

  // 사용자가 화면에서 일부러 "강제 에러 발생 테스트" 옵션을 활성화했거나 simulateError 옵션이 들어왔을 때의 안전한 실패 분기 처리
  if (simulateError === true) {
    return res.status(500).json({
      success: false,
      message: "가상의 생성 에러가 발생했습니다. (요구사항 요구에 따른 의도된 오류 분기 테스트)"
    });
  }

  const ai = getGeminiClient();

  // 만약 실제 API Key가 있고 생성 시도를 전개할 경우
  if (ai) {
    try {
      console.log(`실제 Gemini API 가동: 스타일(${selectedStyle}), 분위기(${moodOption}), 구도(${poseOption})`);
      
      // 1단계: 업로드된 인물 사진의 주요 강점(안경, 헤어스타일, 성별, 표정 등)을 분석하여 어울리는 프롬프트를 번역/출력하기 위해 gemini-3.5-flash 가동
      // base64에서 헤더(data:image/jpeg;base64,)를 파싱하여 base64 본문만 추출
      let base64Body = uploadedImage;
      let mimeType = "image/png";
      if (uploadedImage.includes(";base64,")) {
        const parts = uploadedImage.split(";base64,");
        mimeType = parts[0].split(":")[1] || "image/png";
        base64Body = parts[1];
      }

      const styleInstructionKorean = 
        selectedStyle === 'cute' ? '3D clay cartoon, chubby cute Pixar-style character 3D render, soft clay doll, adorable round face, vibrant pastel colors' :
        selectedStyle === 'webtoon' ? 'Modern anime webtoon style, crisp ink lineart, manhwa character design, expressive anime eyes, sleek beautiful coloring' :
        'Minimalist flat custom vector illustration style, clean outline aesthetic, flat solid colors, modern profile avatar portrait';

      const moodText = moodOption === 'bright' ? 'extremely bright, joyful, warm smiling expression, dynamic lighting' : 'calm, peaceful expression, soft moody interior cozy lighting, quiet ambience';
      const poseText = poseOption === 'face' ? 'close-up face focus portrait, centered' : 'waist-up upper-body portrait aspect, natural pose';

      // 텍스트 프롬프트를 풍요롭게 변환하기
      const analyzeResponse = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: [
          {
            inlineData: {
              data: base64Body,
              mimeType: mimeType
            }
          },
          `Analyze this person's portrait face, age group, hair color, eye wear, hair style, clothing, and expression. Then write a 1-sentence photo description about them. Ensure it is respectful and focused only on visual elements.`
        ]
      });

      const faceDescription = analyzeResponse.text || "a charming individual with expressive features";
      
      // 최종 Imagen 3 이미지 생성 프롬프트 작명
      const finalPrompt = `${styleInstructionKorean} of a character modeled after ${faceDescription}. ${moodText}, ${poseText}, isolated solid clean flat pastel background, supreme masterpiece, detailed digital portrait, professional artwork, 1character, artstation trending.`;

      console.log("최종 구성된 AI 생성 프롬프트:", finalPrompt);

      // 2단계: Imagen 3를 사용하여 전용 캐릭터 일러스트를 실제 생성!
      // 'imagen-3.0-generate-002' 모델 등을 연동하여 실제 이미지 획득
      // (혹은 fallback으로 gemini-3.1-flash-image 시도)
      try {
        const imageGenResponse = await ai.models.generateImages({
          model: 'imagen-3.0-generate-002',
          prompt: finalPrompt,
          config: {
            numberOfImages: 1,
            outputMimeType: 'image/png',
            aspectRatio: '1:1',
          },
        });

        if (imageGenResponse.generatedImages && imageGenResponse.generatedImages.length > 0) {
          const rawBytes = imageGenResponse.generatedImages[0].image.imageBytes;
          const returnedImageUrl = `data:image/png;base64,${rawBytes}`;
          
          return res.json({
            success: true,
            isMock: false,
            generatedImage: returnedImageUrl,
            promptUsed: finalPrompt,
            message: "실제 Gemini Imagen 3 인공지능이 캐릭터 변환에 성공했습니다."
          });
        }
      } catch (err) {
        console.warn("Imagen 모델 생성 실패로, gemini-3.1-flash-image 대체 생성을 시도합니다:", err);
        // 대체 타구안: gemini-3.1-flash-image 시도
        const flashImageResponse = await ai.models.generateContent({
          model: 'gemini-3.1-flash-image',
          contents: {
            parts: [{ text: finalPrompt }]
          },
          config: {
            imageConfig: {
              aspectRatio: "1:1",
              imageSize: "1K"
            }
          }
        });

        for (const part of flashImageResponse.candidates?.[0]?.content?.parts || []) {
          if (part.inlineData) {
            const returnedImageUrl = `data:image/png;base64,${part.inlineData.data}`;
            return res.json({
              success: true,
              isMock: false,
              generatedImage: returnedImageUrl,
              promptUsed: finalPrompt,
              message: "Gemini Image Generator가 캐릭터 변환에 성공했습니다!"
            });
          }
        }
      }

      throw new Error("모든 AI 이미지 모델이 응답하지 않았거나 할당량 한도에 도달했습니다.");

    } catch (error: any) {
      console.error("Gemini 핵심 처리 중 오류 발생 (자동 Fallback 전환):", error);
      // API 오류 시 중단되지 않고, 가이드라인에 따른 부드러운 fallback으로 캐릭터 매핑
      return res.json({
        success: true,
        isMock: true,
        generatedImage: null, // 클라이언트가 획득해서 고화질 로컬 사전빌드 이미지 매핑 유인용
        message: `API 한도 또는 네트워크 혼잡으로 가상 매칭 엔진이 안전하게 실행되었습니다. (${error?.message || "Fallback 활성화"})`
      });
    }
  }

  // API Key가 등록되지 않은 완전 가상 로컬 테스트 상태 (사용자 요구사항 부합)
  // 1초 뒤에 매끄럽게 응답
  await new Promise(resolve => setTimeout(resolve, 1200));
  
  res.json({
    success: true,
    isMock: true,
    generatedImage: null, // 클라이언트에서 로컬 카탈로그를 매핑하도록 신호
    message: "로컬 캐릭터 생성 시뮬레이터가 성공적으로 실행되었습니다."
  });
});

// 3. 정적 파일 호스팅 및 SPA 라우팅 미들웨어 구축
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[캐릭터 메이커] 풀스택 서버가 성공적으로 작동중입니다: http://localhost:${PORT}`);
  });
}

startServer();
