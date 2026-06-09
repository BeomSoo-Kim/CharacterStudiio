/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Loader2, Sparkles, Wand2 } from 'lucide-react';
import { motion } from 'motion/react';

export default function LoadingView() {
  const [msgIdx, setMsgIdx] = useState(0);

  // 로딩 도중 사용자 지루함을 덜어주기 위한 친근한 한글 멘트 순환 노출
  const loadingMessages = [
    '업로드된 사진의 이목구비 윤곽을 분석하고 있어요...',
    '선택하신 화풍을 반영하기 위해 스케치북을 펼치는 중이에요 ✍️',
    '캐릭터의 머리 모양과 눈 크기 비율을 보정하고 있어요 😊',
    '예쁜 파스텔 톤으로 캐릭터 붓 칠 도색을 입히고 있어요 🎨',
    '분위기와 화면 크기 구도의 배치 밸런스를 정렬하고 있어요 ✨',
    '거의 다 완성되었어요! 잠시만 더 기다려 주세요 💕'
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setMsgIdx((prev) => (prev + 1) % loadingMessages.length);
    }, 2200);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="mx-auto max-w-xl px-4 py-16 text-center">
      <div className="flex flex-col items-center justify-center space-y-6">
        
        {/* 화려하고 역동적인 스피너 효과 */}
        <div className="relative">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1.8, ease: 'linear' }}
            className="flex h-20 w-20 items-center justify-center rounded-full border-4 border-[#E5E2D9] border-t-[#6B705C] shadow-md"
          >
            <Wand2 className="h-8 w-8 text-[#6B705C] animate-pulse" />
          </motion.div>
          <div className="absolute -top-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-[#6B705C] text-xs text-white animate-bounce shadow">
            ✨
          </div>
        </div>

        {/* 안내 텍스트 영역 */}
        <div className="space-y-3">
          <h3 className="font-serif text-xl font-bold text-[#5A5A40] flex items-center justify-center gap-1.5">
            <span>나만의 캐릭터를 만드는 중입니다</span>
          </h3>
          <p className="text-xs text-[#8A8A7A] max-w-sm mx-auto">
            업로드해 주신 소중한 사진의 얼굴 윤곽을 읽고 자연스러운 화풍 일러스트를 드로잉하고 있습니다.
          </p>
        </div>

        {/* 멘트 캐러셀 순화 (모션 페이드 적용) */}
        <div className="w-full max-w-xs rounded-2xl border border-[#E5E2D9] bg-[#FAF9F6] px-4 py-3.5 shadow-inner">
          <span className="text-[10px] font-bold text-[#6B705C] tracking-wider block uppercase mb-1">
            진행 프로세스
          </span>
          <p className="min-h-[32px] text-xs font-semibold text-[#5A5A40] leading-normal flex items-center justify-center">
            {loadingMessages[msgIdx]}
          </p>
        </div>

        {/* 쁘띠 진행 바 */}
        <div className="w-48 h-1.5 bg-[#FAF9F6] border border-[#E5E2D9] rounded-full overflow-hidden">
          <motion.div
            initial={{ width: '5%' }}
            animate={{ width: '95%' }}
            transition={{ duration: 15 }}
            className="h-full bg-[#6B705C]"
          />
        </div>

      </div>
    </div>
  );
}
