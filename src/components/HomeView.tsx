/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ArrowRight, BookOpen, Sparkles, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';
import { AppStatus } from '../types';

interface HomeViewProps {
  onStart: () => void;
  onNavigate: (status: AppStatus) => void;
}

export default function HomeView({ onStart, onNavigate }: HomeViewProps) {
  // 대표 캐릭터 카드 데이터
  const showcases = [
    {
      title: '귀여운 캐릭터풍',
      desc: '동글동글 Pixar 3D 클레이 스타일',
      img: 'https://images.unsplash.com/photo-1596495578065-6e0763fa1141?auto=format&fit=crop&q=80&w=300',
      tag: '초보 추천',
      color: 'border-[#E5E2D9] bg-white text-[#4A4A4A]',
      icon: '🧸'
    },
    {
      title: '웹툰 만화풍',
      desc: '또렷하고 세련된 정통 만화 주인공',
      img: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&q=80&w=300',
      tag: '인기 폭발',
      color: 'border-[#E5E2D9] bg-white text-[#4A4A4A]',
      icon: '✨'
    },
    {
      title: '심플 일러스트',
      desc: '감각적인 미니멀 벡터 아바타 프로필',
      img: 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?auto=format&fit=crop&q=80&w=300',
      tag: '개성 넘침',
      color: 'border-[#E5E2D9] bg-white text-[#4A4A4A]',
      icon: '🎨'
    }
  ];

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 md:py-12">
      <div className="grid gap-8 md:grid-cols-12 items-center">
        
        {/* 설명 및 진입 영역 (Left) */}
        <div className="md:col-span-6 space-y-6 text-center md:text-left">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-1.5 rounded-full bg-[#F1EDE4] px-4 py-1 text-xs font-semibold text-[#6B705C] border border-[#E5E2D9]"
          >
            <Sparkles className="h-3.5 w-3.5 animate-pulse text-[#6B705C]" />
            <span>나만의 캐릭터 스튜디오 MVP</span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="font-serif text-3xl font-bold tracking-tight text-[#5A5A40] sm:text-4xl leading-tight"
          >
            사진 한 장으로<br/>
            나만의 <span className="text-[#6B705C] border-b-2 border-[#D1CDC0] pb-1">예쁜 캐릭터</span>를<br/>
            만들어보세요!
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-sm sm:text-base text-[#6E6E60] leading-relaxed max-w-md mx-auto md:mx-0 font-sans"
          >
            복잡한 그림 편집 툴은 이제 안녕! 인물 사진을 한 장 올리면 친근하고 똑똑한 인공지능 비서가 3가지 감성 테마에 어울리는 완벽한 프로필 일러스트로 그려 드립니다.
          </motion.p>

          <div className="bg-[#FAF9F6] p-4.5 rounded-2xl border border-[#E5E2D9] text-xs text-[#5A5A40] text-left space-y-2 max-w-md mx-auto md:mx-0">
            <span className="font-bold flex items-center gap-1.5 text-[#6B705C]">💡 든든한 사생활 보장</span>
            <ul className="list-disc pl-4 space-y-1.5 text-[#7A7A6A]">
              <li>얼굴 윤곽선이 정면에 가깝고 어둡지 않은 사진일수록 정교하게 표현됩니다.</li>
              <li>업로드된 개인 실명 사진은 변환이 완료되는 즉시 서버 메모리에서 영구히 자동 소멸되어 완벽하게 안심할 수 있습니다.</li>
            </ul>
          </div>

          {/* 메인 버튼 배치 */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-3 pt-2 justify-center md:justify-start"
          >
            <button
              id="btn-home-start"
              onClick={onStart}
              className="group flex items-center justify-center gap-2 rounded-2xl bg-[#6B705C] px-6 py-4 text-sm font-bold text-white shadow-lg hover:bg-[#5A5A40] transition-transform active:scale-95 duration-200"
            >
              <span>사진 올리고 변환 시작하기</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>

            <button
              id="btn-home-guide"
              onClick={() => onNavigate('guide')}
              className="flex items-center justify-center gap-2 rounded-2xl border border-[#D1CDC0] bg-white px-6 py-4 text-sm font-bold text-[#6B705C] transition-colors hover:bg-[#FAF9F6] active:scale-95 duration-200"
            >
              <BookOpen className="h-4 w-4" />
              <span>사용 방법 가이드</span>
            </button>
          </motion.div>
        </div>

        {/* 대표 쇼케이스 그리드 영역 (Right) */}
        <div className="md:col-span-6 space-y-4">
          <h3 className="text-center md:text-left text-xs font-bold tracking-wider text-[#8A8A7A] uppercase">
            🎨 감성적인 3가지 캐릭터 스타일 선택지
          </h3>
          <div className="grid gap-3 sm:grid-cols-3 md:grid-cols-1 md:gap-4.5">
            {showcases.map((card, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + index * 0.1, duration: 0.4 }}
                className={`flex gap-3.5 items-center rounded-2xl border p-4 shadow-sm transition-all hover:shadow-md ${card.color}`}
              >
                <div className="relative">
                  <img
                    src={card.img}
                    alt={card.title}
                    className="h-14 w-14 rounded-xl object-cover border border-[#E5E2D9]"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute -bottom-1 -right-1 bg-white rounded-full w-5 h-5 shadow flex items-center justify-center text-xs">
                    {card.icon}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="font-serif text-sm font-bold text-[#5A5A40]">
                      {card.title}
                    </span>
                    <span className="rounded-full bg-[#F1EDE4] px-2 py-0.5 text-[8px] font-bold text-[#6B705C]">
                      {card.tag}
                    </span>
                  </div>
                  <p className="truncate text-xs text-[#8A8A7A] mt-1">
                    {card.desc}
                  </p>
                </div>
                <CheckCircle2 className="h-4 w-4 text-[#6B705C]" />
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
