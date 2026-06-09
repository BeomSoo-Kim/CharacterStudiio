/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BookOpen, Camera, Check, HelpCircle, AlertTriangle, ArrowRight, Home } from 'lucide-react';
import { motion } from 'motion/react';
import { AppStatus } from '../types';

interface GuideViewProps {
  onStart: () => void;
  onNavigate: (status: AppStatus) => void;
}

export default function GuideView({ onStart, onNavigate }: GuideViewProps) {
  const steps = [
    {
      num: '1',
      title: '인물 사진 올리기',
      desc: '본인의 정면 얼굴이나 프로필로 바꾸고 싶은 한 명의 독사진을 선택하여 업로드합니다.'
    },
    {
      num: '2',
      title: '나만의 테마 고르기',
      desc: '3가지 테마(귀여운 캐릭터, 웹툰 주인공, 심플 일러스트) 및 구도/분위기를 고릅니다.'
    },
    {
      num: '3',
      title: '캐릭터 생성하기',
      desc: '생성 버튼을 누르고 잠시 대기합니다. 인공지능이 얼굴형과 특징을 계산해 그림을 제작합니다.'
    },
    {
      num: '4',
      title: '내 기기에 보관하기',
      desc: '성공적으로 완성된 캐릭터 일러스트를 오랫동안 길게 탭하거나 저장 버튼을 눌러 소장합니다.'
    }
  ];

  const goodBadTips = {
    good: [
      '모자나 마스크를 벗고 정면으로 또렷이 응시한 사진',
      '이목구비(눈, 코, 입) 전체가 시원하게 나온 밝은 독사진',
      '셀카나 깔끔한 실내 조명 밑에서 선명하게 찍은 사진'
    ],
    bad: [
      '어두워 형태 파악이 힘들거나 심한 역광인 사진',
      '선글라스, 안대, 마스크, 손 등으로 아랫턱 등이 많이 가려진 사진',
      '가족사진이나 단체 사진 등 두 명 이상이 같이 찍은 단체컷'
    ]
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <div className="space-y-8">
        
        {/* 상단 타이틀 */}
        <div className="text-center">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#F1EDE4] text-[#6B705C] text-lg">
            📖
          </div>
          <h2 className="mt-3 font-serif text-2xl font-bold text-[#5A5A40]">
            앱 사용 가이드
          </h2>
          <p className="text-xs text-[#8A8A7A] mt-1.5">
            단 3단계만 거치면 예쁜 일러스트가 내 기기로 쏘옥 들어옵니다.
          </p>
        </div>

        {/* 4분할 순서 카드 */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, idx) => (
            <div key={idx} className="relative rounded-2xl border border-[#E5E2D9] bg-white p-5 shadow-sm">
              <span className="absolute top-4 right-4 flex h-7 w-7 items-center justify-center rounded-full bg-[#6B705C] text-[11px] font-bold text-white">
                {step.num}
              </span>
              <h3 className="font-serif text-sm font-bold text-[#5A5A40] pt-2">{step.title}</h3>
              <p className="text-xs text-[#8A8A7A] mt-2 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>

        {/* 좋은 사진과 아쉬운 사진 비교 */}
        <div className="grid gap-6 md:grid-cols-2 pt-2">
          
          {/* 좋은 예 */}
          <div className="rounded-2xl border border-[#6B705C]/30 bg-[#FAF9F6] p-5">
            <div className="flex items-center gap-2 text-[#4A5A30]">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#E5E2D9] text-[#6B705C]">
                <Check className="h-4 w-4" />
              </div>
              <h4 className="text-sm font-bold text-[#5A5A40]">😊 추천하는 사진</h4>
            </div>
            <ul className="mt-4 space-y-2.5 text-xs text-[#6E6E60]">
              {goodBadTips.good.map((t, i) => (
                <li key={i} className="flex items-start gap-1.5 leading-relaxed">
                  <span className="mt-1 text-[#6B705C] font-extrabold">✓</span>
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 아쉬운 예 */}
          <div className="rounded-2xl border border-rose-100 bg-rose-50/40 p-5">
            <div className="flex items-center gap-2 text-rose-800">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-rose-100 text-rose-800">
                <AlertTriangle className="h-4 w-4" />
              </div>
              <h4 className="text-sm font-bold">⚠️ 피해야 할 사진</h4>
            </div>
            <ul className="mt-4 space-y-2.5 text-xs text-rose-900/90">
              {goodBadTips.bad.map((t, i) => (
                <li key={i} className="flex items-start gap-1.5 leading-relaxed">
                  <span className="mt-1 text-rose-500 font-extrabold">✗</span>
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* 도움말 FAQ */}
        <div className="rounded-2xl border border-[#E5E2D9] bg-white p-6 shadow-sm">
          <div className="flex items-center gap-2 text-[#5A5A40]">
            <HelpCircle className="h-5 w-5 text-[#6B705C]" />
            <h4 className="text-sm font-semibold font-serif">🎨 자주 묻는 질문 (FAQ)</h4>
          </div>
          
          <div className="mt-4 divide-y divide-[#E5E2D9] text-xs">
            <div className="py-3">
              <p className="font-bold text-[#4A4A4A]">Q. 무료인가요? 로그인해야 하나요?</p>
              <p className="text-[#8A8A7A] mt-1 leading-relaxed">
                보안 안전 지대인 아이프레임 샌드박스 환경에 맞춰 귀찮은 로그인이 필요 없으며, 누구나 무제한 무료로 다양한 캐릭터 생성을 자유롭게 경험할 수 있습니다.
              </p>
            </div>
            <div className="py-3">
              <p className="font-bold text-[#4A4A4A]">Q. 이미지를 다운로드하고 싶은데 다운로드가 작동하지 않아요.</p>
              <p className="text-[#8A8A7A] mt-1 leading-relaxed">
                일부 브라우저나 스마트폰 환경(카카오톡 인앱 등)에서 저장이 원활하지 않을 수 있습니다. 그럴 경우 결과 고화질 캐릭터를 2초 이상 꾹 누른 뒤 뜨는 팝업 메뉴를 통해 `이미지 저장` 혹은 `사진첩 등록`을 하거나 브라우저 우클릭을 사용하실 것을 권장합니다.
              </p>
            </div>
          </div>
        </div>

        {/* 하단 제어 버튼 */}
        <div className="flex items-center justify-center gap-3 pt-4">
          <button
            id="btn-guide-back"
            onClick={() => onNavigate('home')}
            className="flex items-center gap-1.5 rounded-2xl border border-[#D1CDC0] bg-white px-5 py-3.5 text-xs font-bold text-[#6B705C] transition-colors hover:bg-[#FAF9F6]"
          >
            <Home className="h-4 w-4" />
            <span>홈으로</span>
          </button>

          <button
            id="btn-guide-start"
            onClick={onStart}
            className="flex items-center gap-1.5 rounded-2xl bg-[#6B705C] px-6 py-3.5 text-xs font-bold text-white shadow-md transition-transform active:scale-95 hover:bg-[#5A5A40]"
          >
            <span>지금 사진 올리기</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

      </div>
    </div>
  );
}
