/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Download, RefreshCw, Home, Smile, Heart, ExternalLink, HelpCircle, AlertCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { CharacterStyle, MoodOption, PoseOption } from '../types';

interface ResultViewProps {
  generatedImage: string;
  selectedStyle: CharacterStyle;
  moodOption: MoodOption;
  poseOption: PoseOption;
  isMock: boolean;
  onRegenerate: () => void;
  onReset: () => void;
  onNavigate: (status: any) => void;
}

export default function ResultView({
  generatedImage,
  selectedStyle,
  moodOption,
  poseOption,
  isMock,
  onRegenerate,
  onReset,
  onNavigate
}: ResultViewProps) {
  
  // 스타일 한글 명칭 변환
  const styleLabel = 
    selectedStyle === 'cute' ? '귀여운 캐릭터풍 🌟' :
    selectedStyle === 'webtoon' ? '웹툰 만화풍 ✍️' : 
    '심플 일러스트풍 🎨';

  const moodLabel = moodOption === 'bright' ? '밝고 화사한 스타일' : '차분한 감성 스타일';
  const poseLabel = poseOption === 'face' ? '얼굴 중심 앵글' : '상반신 자연스러운 앵글';

  // 실제 이미지 로컬 파일 다운로드 트리거
  const handleDownload = () => {
    try {
      const link = document.createElement('a');
      link.href = generatedImage;
      link.download = `character-${selectedStyle}-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (e) {
      console.error('다운로드 중 오류가 발생했습니다. 수동 저장을 사용하세요.', e);
      alert('스마트폰이나 브라우저 정책으로 직접 저장이 제한되었습니다. 아래 안내처럼 이미지를 꾹 누르거나 마우스 우클릭으로 저장해 주세요!');
    }
  };

  return (
    <div className="mx-auto max-w-xl px-4 py-6 md:py-10">
      <div className="space-y-6">
        
        {/* 상단 제목 */}
        <div className="text-center">
          <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#F1EDE4] text-[#6B705C] mb-2">
            <Heart className="h-5 w-5 fill-[#6B705C] text-[#6B705C]" />
          </div>
          <h2 className="font-serif text-2xl font-bold text-[#5A5A40] leading-tight">
            나만의 고유 캐릭터 완성!
          </h2>
          <p className="text-xs text-[#8A8A7A] mt-1.5">
            인공지능이 계산한 나만을 위한 한정판 일러스트입니다.
          </p>
        </div>

        {/* 결과 이미지 메인 카드 */}
        <div className="relative rounded-2xl border-4 border-white bg-white p-2.5 shadow-xl">
          <div className="relative h-72 w-full overflow-hidden rounded-xl bg-[#FAF9F6] sm:h-80">
            <img
              src={generatedImage}
              alt="완성된 캐릭터 그림"
              className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
              referrerPolicy="no-referrer"
            />
            
            {/* 실시간 백엔드 생성 여부 배지 */}
            <span className="absolute bottom-3 left-3 rounded-lg bg-gray-900/80 px-2.5 py-1 text-[10px] font-bold text-white backdrop-blur-sm">
              {isMock ? '☁️ 가상 매칭 변환' : '⚡ Gemini AI 실시간 이미지'}
            </span>
          </div>
        </div>

        {/* 선택한 옵션 정보 영역 */}
        <div className="rounded-2xl border border-[#E5E2D9] bg-[#FAF9F6] p-4 text-xs space-y-2">
          <div className="flex justify-between items-center pb-2 border-b border-[#E5E2D9]">
            <span className="text-[#8A8A7A]">선택한 메인 스타일</span>
            <span className="font-bold text-[#5A5A40] text-right">{styleLabel}</span>
          </div>
          <div className="flex justify-between items-center text-[11px]">
            <span className="text-[#8A8A7A]">지정된 톤 분위기</span>
            <span className="font-semibold text-[#4A4A4A]">{moodLabel}</span>
          </div>
          <div className="flex justify-between items-center text-[11px]">
            <span className="text-[#8A8A7A]">요청한 구도 앵글</span>
            <span className="font-semibold text-[#4A4A4A]">{poseLabel}</span>
          </div>
        </div>

        {/* 다운로드 제한 우회 수동 안내 카드 */}
        <div className="flex gap-2.5 rounded-xl bg-[#FAF9F6] border border-[#D1CDC0] p-4 text-[11px] text-[#5A5A40] leading-normal">
          <AlertCircle className="h-4 w-4 shrink-0 text-[#6B705C] mt-0.5" />
          <div>
            <p className="font-bold text-[#5A5A40]">📱 스마트폰 보관 완료 팁!</p>
            <p className="text-[#8A8A7A] mt-0.5">
              사용 중이신 모바일 브라우저에 따라 이 다운로드 단추가 차단될 때가 있습니다. 
              그럴 때는 <b>위 완성 사진을 2초 이상 꾹 누르고 계시면</b> 내 스마트폰 팝업에서 [이미지 저장]을 선택해 쉽게 보관할 수 있습니다.
            </p>
          </div>
        </div>

        {/* 액션 버튼 패널 */}
        <div className="grid gap-2.5">
          
          <button
            id="btn-result-download"
            onClick={handleDownload}
            className="flex items-center justify-center gap-1.5 rounded-2xl bg-[#6B705C] py-3.5 text-xs font-bold text-white transition-all hover:bg-[#5A5A40] active:scale-95 shadow-md shadow-[#6B705C]/10"
          >
            <Download className="h-4 w-4" />
            <span>이미지 기기에 저장하기</span>
          </button>

          <div className="grid grid-cols-2 gap-2">
            <button
              id="btn-result-regen"
              onClick={onRegenerate}
              className="flex items-center justify-center gap-1.5 rounded-2xl border border-[#D1CDC0] bg-white py-3 text-xs font-bold text-[#6B705C] transition-colors hover:bg-[#FAF9F6]"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              <span>같은 설정으로 다시그리기</span>
            </button>

            <button
              id="btn-result-reset"
              onClick={onReset}
              className="flex items-center justify-center gap-1.5 rounded-2xl border border-[#D1CDC0] bg-white py-3 text-xs font-bold text-[#8A8A7A] transition-colors hover:bg-[#FAF9F6]"
            >
              <Home className="h-3.5 w-3.5" />
              <span>처음 홈으로 돌아가기</span>
            </button>
          </div>

          <button
            id="btn-result-guide"
            onClick={() => onNavigate('guide')}
            className="flex items-center justify-center gap-1 text-[11px] font-bold text-[#6B705C] hover:underline"
          >
            <HelpCircle className="h-3 w-3" />
            <span>도움이 더 필요하신가요? 사용설명서 보기</span>
          </button>

        </div>

      </div>
    </div>
  );
}
