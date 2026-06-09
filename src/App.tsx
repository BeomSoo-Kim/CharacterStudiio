/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AlertCircle, RefreshCw, Home, HelpCircle } from 'lucide-react';

import { CharacterStyle, MoodOption, PoseOption, AppStatus, CharacterMakerState } from './types';
import { getSampleFallbackImage } from './samples';

// 공통 컴포넌트 임포트
import Header from './components/Header';
import HomeView from './components/HomeView';
import GuideView from './components/GuideView';
import UploadView from './components/UploadView';
import StyleView from './components/StyleView';
import LoadingView from './components/LoadingView';
import ResultView from './components/ResultView';

export default function App() {
  // 모바일/PC 통합 상태 홀더
  const [status, setStatus] = useState<AppStatus>('home');
  const [state, setState] = useState<CharacterMakerState>({
    uploadedImage: null,
    imageFileName: null,
    imageSize: null,
    selectedStyle: null,
    moodOption: 'bright', // 기본 추천값 bright
    poseOption: 'face',   // 기본 추천값 face
    generatedImage: null
  });

  // 백엔드 통신 메타 데이터
  const [isMock, setIsMock] = useState(false);
  const [apiMessage, setApiMessage] = useState<string | null>(null);
  const [errorContext, setErrorContext] = useState<string | null>(null);

  // 모든 전역 상태 리셋 함수 (처음 홈 데스크로 이동)
  const handleReset = () => {
    setStatus('home');
    setState({
      uploadedImage: null,
      imageFileName: null,
      imageSize: null,
      selectedStyle: null,
      moodOption: 'bright',
      poseOption: 'face',
      generatedImage: null
    });
    setApiMessage(null);
    setIsMock(false);
    setErrorContext(null);
  };

  // 이미지 업로드 변동 수집기
  const handleImageChanged = (base64: string | null, fileName: string | null, size: number | null) => {
    setState((prev) => ({
      ...prev,
      uploadedImage: base64,
      imageFileName: fileName,
      imageSize: size
    }));
  };

  // 스타일 설정 패널 트리거
  const handleStyleChanged = (style: CharacterStyle) => {
    setState((prev) => ({ ...prev, selectedStyle: style }));
  };

  const handleMoodChanged = (mood: MoodOption) => {
    setState((prev) => ({ ...prev, moodOption: mood }));
  };

  const handlePoseChanged = (pose: PoseOption) => {
    setState((prev) => ({ ...prev, poseOption: pose }));
  };

  // 핵심 로직: 이미지 생성 실행 요청 파이프라인 (실패/성공 분기 완전 구현)
  const handleGenerate = async (simulateError: boolean) => {
    if (!state.uploadedImage || !state.selectedStyle) return;

    setStatus('generating');
    setErrorContext(null);

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          uploadedImage: state.uploadedImage,
          selectedStyle: state.selectedStyle,
          moodOption: state.moodOption,
          poseOption: state.poseOption,
          simulateError: simulateError // 의도된 오류 테스트 연동용 플래그
        })
      });

      const data = await response.json();

      if (!response.ok || data.success === false) {
        throw new Error(data.message || '캐릭터 생성 중 예상치 못한 장애가 일어났습니다.');
      }

      // API가 직접 이미지를 가져다 주지 못하는 가상 Mock Fallback 상태일 경우
      if (data.isMock === true && !data.generatedImage) {
        setIsMock(true);
        // 정교한 화풍 매트릭스 알고리즘에 기초하여 수려한 로컬 일러스트를 추출해 줍니다.
        const fallbackUrl = getSampleFallbackImage(state.selectedStyle, state.moodOption, state.poseOption);
        setState((prev) => ({ ...prev, generatedImage: fallbackUrl }));
      } else {
        // 실제 Gemini가 완벽하게 그려준 Base64 캐릭터 일러스트 탑재
        setIsMock(false);
        setState((prev) => ({ ...prev, generatedImage: data.generatedImage }));
      }

      setApiMessage(data.message || null);
      setStatus('success');

    } catch (err: any) {
      console.error('캐릭터 빌드 장애 보고:', err);
      setErrorContext(err?.message || '인공지능 이미지 그리기 서버와 통신 도중 일시적 타임아웃이 발생했습니다.');
      setStatus('error');
    }
  };

  // 생성 실패 상태에서의 긴급 구제 "다시 시도하기"
  const handleRetryAfterError = () => {
    setStatus('style'); // 선택 화면으로 안전하게 돌려줍니다.
  };

  // 네비게이션 점프 컨트롤러
  const handleNavigate = (targetStatus: AppStatus) => {
    setStatus(targetStatus);
  };

  // 다음 스텝 (업로드 -> 스타일 고르기)
  const handleNextToStyle = () => {
    if (state.uploadedImage) {
      setStatus('style');
    }
  };

  return (
    <div id="character-maker-app" className="flex min-h-screen flex-col bg-[#F8F7F2]">
      {/* 고정 상단 네비게이션 헤더 */}
      <Header
        currentStatus={status}
        onNavigate={handleNavigate}
        onReset={handleReset}
      />

      {/* 부드러운 스위칭 모션 컨테이너 */}
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={status}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="w-full"
          >
            {status === 'home' && (
              <HomeView
                onStart={() => setStatus('upload')}
                onNavigate={handleNavigate}
              />
            )}

            {status === 'guide' && (
              <GuideView
                onStart={() => setStatus('upload')}
                onNavigate={handleNavigate}
              />
            )}

            {status === 'upload' && (
              <UploadView
                uploadedImage={state.uploadedImage}
                imageFileName={state.imageFileName}
                imageSize={state.imageSize}
                onImageChanged={handleImageChanged}
                onNavigate={handleNavigate}
                onNext={handleNextToStyle}
              />
            )}

            {status === 'style' && (
              <StyleView
                selectedStyle={state.selectedStyle}
                moodOption={state.moodOption}
                poseOption={state.poseOption}
                onStyleChanged={handleStyleChanged}
                onMoodChanged={handleMoodChanged}
                onPoseChanged={handlePoseChanged}
                onNavigate={handleNavigate}
                onPrev={() => setStatus('upload')}
                onGenerate={handleGenerate}
              />
            )}

            {status === 'generating' && <LoadingView />}

            {status === 'success' && state.generatedImage && (
              <ResultView
                generatedImage={state.generatedImage}
                selectedStyle={state.selectedStyle!}
                moodOption={state.moodOption}
                poseOption={state.poseOption}
                isMock={isMock}
                onRegenerate={() => handleGenerate(false)}
                onReset={handleReset}
                onNavigate={handleNavigate}
              />
            )}

            {status === 'error' && (
              <div className="mx-auto max-w-md px-4 py-16 text-center space-y-6">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-100 text-red-600">
                  <AlertCircle className="h-8 w-8" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-serif text-xl font-bold text-[#5A5A40]">
                    문제가 생겼어요 🥲
                  </h3>
                  <p className="text-xs text-rose-800 bg-rose-50 p-4 rounded-2xl border border-rose-100 leading-normal">
                    {errorContext || '이미지를 만들지 못했거나 지연이 발생했습니다. 사진 형식을 다시 확인해 주세요.'}
                  </p>
                </div>
                
                <div className="flex gap-3 justify-center">
                  <button
                    id="btn-error-retry"
                    onClick={handleRetryAfterError}
                    className="flex items-center gap-1.5 rounded-2xl bg-[#6B705C] px-5 py-3.5 text-xs font-bold text-white shadow-sm hover:bg-[#5A5A40] transition-colors"
                  >
                    <RefreshCw className="h-4 w-4" />
                    <span>다시 시도하기</span>
                  </button>

                  <button
                    id="btn-error-home"
                    onClick={handleReset}
                    className="flex items-center gap-1.5 rounded-2xl border border-[#D1CDC0] bg-white px-5 py-3.5 text-xs font-bold text-[#6B705C] hover:bg-[#FAF9F6] transition-colors"
                  >
                    <Home className="h-4 w-4" />
                    <span>처음으로</span>
                  </button>
                </div>

                <p className="text-[10px] text-[#8A8A7A] mt-4 leading-normal">
                  팁: 고급 테스트 옵션의 오류 발생 세팅을 활성화하셨거나, 일시적으로 네트워크가 지연되었을 수 있습니다. 사용설명서를 확인해 보세요.
                </p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* 고정 하단 카피라이트 */}
      <footer className="w-full border-t border-[#E5E2D9] bg-white/50 py-4 text-center text-[10px] text-[#8A8A7A]">
        <p>© 2026 캐릭터 스튜디오 MVP. All rights reserved. 얼굴 인식 데이터의 프라이버시는 철저히 보호됩니다.</p>
      </footer>
    </div>
  );
}
