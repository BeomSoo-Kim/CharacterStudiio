/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { ArrowLeft, Sparkles, BookOpen, Smile, Palette, Layout, Settings, AlertTriangle } from 'lucide-react';
import { motion } from 'motion/react';
import { CharacterStyle, MoodOption, PoseOption, AppStatus } from '../types';

interface StyleViewProps {
  selectedStyle: CharacterStyle | null;
  moodOption: MoodOption;
  poseOption: PoseOption;
  onStyleChanged: (style: CharacterStyle) => void;
  onMoodChanged: (mood: MoodOption) => void;
  onPoseChanged: (pose: PoseOption) => void;
  onNavigate: (status: AppStatus) => void;
  onPrev: () => void;
  onGenerate: (simulateError: boolean) => void;
}

export default function StyleView({
  selectedStyle,
  moodOption,
  poseOption,
  onStyleChanged,
  onMoodChanged,
  onPoseChanged,
  onNavigate,
  onPrev,
  onGenerate
}: StyleViewProps) {
  // 사용 중 에러 테스트 분기 시뮬레이터 플래그
  const [simulateError, setSimulateError] = useState(false);

  // 3가지 캐릭터 스타일 카드 카탈로그
  const stylesList = [
    {
      id: 'cute' as CharacterStyle,
      title: '귀여운 캐릭터풍 🧸',
      desc: '동글동글 Pixar 형식의 점토 필링과 귀엽고 화사한 아가모양 3D 드로잉 기법입니다.',
      tag: '초보 추천',
      sampleUrl: 'https://images.unsplash.com/photo-1596495578065-6e0763fa1141?auto=format&fit=crop&q=80&w=150',
      outlineColor: 'border-[#6B705C] focus:ring-[#6B705C]/30',
      selectedBg: 'bg-[#FAF9F6] border-[#6B705C] text-[#5A5A40] font-bold'
    },
    {
      id: 'webtoon' as CharacterStyle,
      title: '웹툰 주인공풍 ✨',
      desc: '선명한 펜 라인 크로키와 실제 만화에서 바로 튀어나온 듯한 완성도 높은 이목구비입니다.',
      tag: '만화 트렌드',
      sampleUrl: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&q=80&w=150',
      outlineColor: 'border-[#6B705C] focus:ring-[#6B705C]/30',
      selectedBg: 'bg-[#FAF9F6] border-[#6B705C] text-[#5A5A40] font-bold'
    },
    {
      id: 'simple' as CharacterStyle,
      title: '심플 일러스트풍 🎨',
      desc: '미니멀한 실루엣 데포르메와 편안한 파스텔 배경으로 깔끔한 프런트 프로필에 강추합니다.',
      tag: '프로필 특화',
      sampleUrl: 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?auto=format&fit=crop&q=80&w=150',
      outlineColor: 'border-[#6B705C] focus:ring-[#6B705C]/30',
      selectedBg: 'bg-[#FAF9F6] border-[#6B705C] text-[#5A5A40] font-bold'
    }
  ];

  return (
    <div className="mx-auto max-w-xl px-4 py-8">
      <div className="space-y-6">
        
        {/* 상단 타이틀 */}
        <div className="text-center">
          <h2 className="font-serif text-2xl font-bold text-[#5A5A40] leading-tight">
            캐릭터 스타일 및 분위기 설정
          </h2>
          <p className="text-xs text-[#6B705C] font-semibold bg-[#FAF9F6] border border-[#E5E2D9] inline-block px-3 py-1.5 rounded-full mt-2.5">
            💡 처음 시작할 때는 <span className="underline">귀여운 캐릭터풍</span>을 골라보세요!
          </p>
        </div>

        {/* 1. 스타일 카드 그리드 (세로 정렬로 손작동이 매우 쾌적) */}
        <div className="space-y-3">
          <label className="flex items-center gap-1.5 text-xs font-bold text-[#5A5A40]">
            <Palette className="h-4 w-4 text-[#6B705C]" />
            <span>캐릭터 화풍 선택 (필수)</span>
          </label>

          <div className="grid gap-3">
            {stylesList.map((st) => {
              const isSelected = selectedStyle === st.id;
              return (
                <button
                  id={`style-card-${st.id}`}
                  key={st.id}
                  onClick={() => onStyleChanged(st.id)}
                  className={`flex items-center gap-4 text-left rounded-2xl border-2 p-3.5 transition-all outline-none ${
                    isSelected 
                      ? `${st.selectedBg} scale-[1.01] shadow-sm` 
                      : 'border-[#E5E2D9] bg-white hover:border-[#D1CDC0] text-[#4A4A4A]'
                  }`}
                >
                  {/* 조그마한 예시 썸네일 */}
                  <img
                    src={st.sampleUrl}
                    alt={st.title}
                    className="h-14 w-14 shrink-0 rounded-xl object-cover border border-[#E5E2D9] shadow-sm"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* 설명글 */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold block text-[#5A5A40]">{st.title}</span>
                      <span className="rounded-full bg-[#F1EDE4] px-2 py-0.5 text-[8.5px] font-bold text-[#6B705C] border border-[#E5E2D9]">
                        {st.tag}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#8A8A7A] mt-1 leading-relaxed">
                      {st.desc}
                    </p>
                  </div>
                  
                  {/* 동그라미 라디오 */}
                  <div className={`h-5 w-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                    isSelected ? 'border-[#6B705C] bg-[#6B705C]' : 'border-gray-300'
                  }`}>
                    {isSelected && <div className="h-2 w-2 rounded-full bg-white" />}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. 분위기 옵션 선택 */}
        <div className="space-y-2">
          <label className="flex items-center gap-1.5 text-xs font-bold text-[#5A5A40]">
            <Smile className="h-4 w-4 text-[#6B705C]" />
            <span>어떤 분위기로 그릴까요?</span>
          </label>
          <div className="grid grid-cols-2 gap-2.5">
            <button
              id="opt-mood-bright"
              type="button"
              onClick={() => onMoodChanged('bright')}
              className={`rounded-2xl border-2 py-3 text-xs font-bold transition-all ${
                moodOption === 'bright'
                  ? 'border-[#6B705C] bg-[#F1EDE4] text-[#5A5A40] font-extrabold shadow-sm'
                  : 'border-[#E5E2D9] bg-white text-[#8A8A7A] hover:bg-[#FAF9F6]'
              }`}
            >
              ☀️ 밝고 화사한 스타일
            </button>
            <button
              id="opt-mood-calm"
              type="button"
              onClick={() => onMoodChanged('calm')}
              className={`rounded-2xl border-2 py-3 text-xs font-bold transition-all ${
                moodOption === 'calm'
                  ? 'border-[#6B705C] bg-[#F1EDE4] text-[#5A5A40] font-extrabold shadow-sm'
                  : 'border-[#E5E2D9] bg-white text-[#8A8A7A] hover:bg-[#FAF9F6]'
              }`}
            >
              🌙 차분하고 감성적인 스타일
            </button>
          </div>
        </div>

        {/* 3. 구도 옵션 선택 */}
        <div className="space-y-2">
          <label className="flex items-center gap-1.5 text-xs font-bold text-[#5A5A40]">
            <Layout className="h-4 w-4 text-[#6B705C]" />
            <span>캐릭터 화면 크기 구도</span>
          </label>
          <div className="grid grid-cols-2 gap-2.5">
            <button
              id="opt-pose-face"
              type="button"
              onClick={() => onPoseChanged('face')}
              className={`rounded-2xl border-2 py-3 text-xs font-bold transition-all ${
                poseOption === 'face'
                  ? 'border-[#6B705C] bg-[#F1EDE4] text-[#5A5A40] font-extrabold shadow-sm'
                  : 'border-[#E5E2D9] bg-white text-[#8A8A7A] hover:bg-[#FAF9F6]'
              }`}
            >
              👤 얼굴 중심 (증명사진)
            </button>
            <button
              id="opt-pose-upper"
              type="button"
              onClick={() => onPoseChanged('upperBody')}
              className={`rounded-2xl border-2 py-3 text-xs font-bold transition-all ${
                poseOption === 'upperBody'
                  ? 'border-[#6B705C] bg-[#F1EDE4] text-[#5A5A40] font-extrabold shadow-sm'
                  : 'border-[#E5E2D9] bg-white text-[#8A8A7A] hover:bg-[#FAF9F6]'
              }`}
            >
              👕 상반신 위주 구도
            </button>
          </div>
        </div>

        {/* 🛠 고급 사양 (MVP 특화 이미지 생성 실패 분기 테스트를 위한 도구) */}
        <div className="rounded-2xl border border-[#E5E2D9] bg-white p-3.5 space-y-1.5 shadow-sm">
          <button
            id="toggle-advanced"
            type="button"
            onClick={() => setSimulateError(!simulateError)}
            className="flex items-center justify-between w-full text-left focus:outline-none"
          >
            <span className="flex items-center gap-1 text-[11px] font-bold text-gray-400">
              <Settings className="h-3 w-3" />
              <span>고급 테스트 옵션 (오류 상황 검증 전용)</span>
            </span>
            <span className={`inline-block w-8 h-4 rounded-full transition-colors relative ${
              simulateError ? 'bg-[#CB997E]' : 'bg-gray-250'
            }`}>
              <span className={`absolute top-0.5 left-0.5 bg-white w-3 h-3 rounded-full transition-transform ${
                simulateError ? 'translate-x-4' : 'translate-x-0'
              }`} />
            </span>
          </button>
          
          {simulateError && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex gap-1.5 p-2 rounded-lg bg-red-50 border border-red-100 text-[10px] text-red-700 leading-normal"
            >
              <AlertTriangle className="h-3 w-3 shrink-0 mt-0.5" />
              <span>활성화 시 의도적으로 <b>실패 응답(Error 500)</b> 상태를 유발합니다. 요구사항에 적힌 실패 분기 및 쉬운 한글 구제책을 즉각 실험할 수 있습니다.</span>
            </motion.div>
          )}
        </div>

        {/* 제어 피드 버튼 */}
        <div className="flex gap-3 pt-2">
          <button
            id="btn-style-prev"
            onClick={onPrev}
            className="flex flex-1 items-center justify-center gap-1 rounded-2xl border border-[#D1CDC0] bg-white py-3.5 text-xs font-bold text-[#6B705C] transition-colors hover:bg-[#FAF9F6]"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>이전으로</span>
          </button>

          <button
            id="btn-style-generate"
            disabled={!selectedStyle}
            onClick={() => onGenerate(simulateError)}
            className={`flex flex-[2] items-center justify-center gap-1.5 rounded-2xl py-3.5 text-xs font-bold transition-all shadow-md ${
              selectedStyle
                ? 'bg-[#6B705C] text-white cursor-pointer hover:bg-[#5A5A40] active:scale-95 shadow-[#6B705C]/15'
                : 'bg-[#E5E2D9] text-[#A09E94] cursor-not-allowed shadow-none'
            }`}
          >
            <Sparkles className="h-3.5 w-3.5 text-white animate-pulse" />
            <span>나만의 캐릭터 만들기</span>
          </button>
        </div>

      </div>
    </div>
  );
}
