/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { CharacterSample } from './types';

export const SAMPLE_CHARACTERS: CharacterSample[] = [
  // 1. 귀여운 캐릭터풍 (Cute style)
  {
    style: 'cute',
    mood: 'bright',
    pose: 'face',
    imageUrl: 'https://images.unsplash.com/photo-1596495578065-6e0763fa1141?auto=format&fit=crop&q=80&w=600'
  },
  {
    style: 'cute',
    mood: 'bright',
    pose: 'upperBody',
    imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=600'
  },
  {
    style: 'cute',
    mood: 'calm',
    pose: 'face',
    imageUrl: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&q=80&w=600'
  },
  {
    style: 'cute',
    mood: 'calm',
    pose: 'upperBody',
    imageUrl: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&q=80&w=600'
  },

  // 2. 웹툰풍 (Webtoon / Comic style)
  {
    style: 'webtoon',
    mood: 'bright',
    pose: 'face',
    imageUrl: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&q=80&w=600'
  },
  {
    style: 'webtoon',
    mood: 'bright',
    pose: 'upperBody',
    imageUrl: 'https://images.unsplash.com/photo-1560942485-b2a11cc13456?auto=format&fit=crop&q=80&w=600'
  },
  {
    style: 'webtoon',
    mood: 'calm',
    pose: 'face',
    imageUrl: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&q=80&w=600'
  },
  {
    style: 'webtoon',
    mood: 'calm',
    pose: 'upperBody',
    imageUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&q=80&w=600'
  },

  // 3. 심플 일러스트풍 (Simple Illustration style)
  {
    style: 'simple',
    mood: 'bright',
    pose: 'face',
    imageUrl: 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?auto=format&fit=crop&q=80&w=600'
  },
  {
    style: 'simple',
    mood: 'bright',
    pose: 'upperBody',
    imageUrl: 'https://images.unsplash.com/photo-1515462277126-270d878326e5?auto=format&fit=crop&q=80&w=600'
  },
  {
    style: 'simple',
    mood: 'calm',
    pose: 'face',
    imageUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=600'
  },
  {
    style: 'simple',
    mood: 'calm',
    pose: 'upperBody',
    imageUrl: 'https://images.unsplash.com/photo-1554080353-a576cf803bda?auto=format&fit=crop&q=80&w=600'
  }
];

export function getSampleFallbackImage(style: 'cute' | 'webtoon' | 'simple', mood: 'bright' | 'calm', pose: 'face' | 'upperBody'): string {
  const matches = SAMPLE_CHARACTERS.filter(s => s.style === style && s.mood === mood && s.pose === pose);
  if (matches.length > 0) {
    // 무작위 일련번호나 첫번째 항목 매핑
    return matches[0].imageUrl;
  }
  
  // 만약 매칭되는 게 없으면 스타일 중심 매칭
  const styleMatches = SAMPLE_CHARACTERS.filter(s => s.style === style);
  if (styleMatches.length > 0) {
    return styleMatches[Math.floor(Math.random() * styleMatches.length)].imageUrl;
  }

  // 최후의 보루
  return 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&q=80&w=600';
}
