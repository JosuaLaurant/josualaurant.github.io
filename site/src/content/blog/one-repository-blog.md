---
title: 한 저장소로 다시 시작하는 기술 블로그
description: Hugo source와 정적 배포 결과가 갈라진 기존 Pages를, 검증 가능한 단일 Astro 프로젝트로 다시 설계한 기록입니다.
pubDate: 2026-07-21
category: blog-building
writing: ai-authored
summary: ai-generated
tags: [building-the-blog, astro, github-pages]
series: building-the-blog
---

기존 블로그에는 두 저장소가 있었습니다. 한쪽에는 Hugo source가, 다른 쪽에는 생성된 HTML이 있었습니다.
글을 쓰는 곳과 방문자가 보는 곳이 분리된 자체는 틀린 선택이 아니지만, 몇 년이 지나 다시 시작하려니
어느 쪽이 현재 상태인지부터 확인해야 했습니다.

이번에는 한 저장소를 source of truth로 삼습니다. 글은 Markdown으로 쓰고, Astro가 정적 HTML을 만들며,
GitHub Actions가 그 결과를 GitHub Pages에 올립니다. 생성된 결과물을 별도 저장소에 commit하지 않습니다.

## 지금 필요한 것만 고르기

첫 버전에는 Astro, TypeScript, Markdown, native CSS, RSS만 둡니다. 댓글, CMS, 검색, 방문자 분석은
글을 실제로 쌓은 뒤에 필요가 확인되면 추가합니다. 시작할 때부터 모든 기능을 넣는 것보다, 글을
계속 발행할 수 있는 구조가 더 중요합니다.

## 이 블로그에서 남길 기록

첫 주제는 작업 흐름에서 반복되는 병목과 개선 과정입니다. 성능 개선은 전후 숫자만 적지 않고, 측정 조건,
동일성 검사, 실패한 가설, 아직 확인하지 못한 한계를 함께 남깁니다.

블로그 자체를 만드는 과정도 같은 원칙으로 기록합니다. 왜 이 도구를 골랐는지, 무엇을 뺐는지,
배포 전에 어떤 화면을 확인했는지를 다음 글에서 이어서 다룹니다.
