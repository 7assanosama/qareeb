"use client";

import React from "react";
import type { QuranAyah } from "@/lib/types/content";
import { cn, toAyahNumber } from "@/lib/utils";

type Props = {
  /**
   * نصوص الآيات كما وردت من مصدر البيانات, دون أي معالجة أو تعديل,
   * للحفاظ على الرسم العثماني وعلامات الوقف والتشكيل تمامًا.
   */
  ayahs: readonly QuranAyah[];
  /** حجم الخط بالبكسل (الافتراضي 18). */
  fontSize?: number;
  className?: string;
};

/**
 * يعرض نص الآيات القرآنية مع أرقام الآيات كعلامات نهاية آية.
 *
 * في خط KFGQPC Uthmanic Script HAFS تُركَّب الأرقام الهندية (١-٢٨٦, كل
 * أرقام الآيات في المصحف) عبر GSUB في زخرفة علامة آية واحدة تحمل الرقم
 * داخلها. لذلك يُعرض الرقم وحده دون علامة ۝ صريحة: إضافة ۝ يدويًا تُرسم
 * زخرفتين متجاورتين (علامة فارغة + زخرفة الرقم). التحقق من ذلك موثق في
 * app/fonts/README.md.
 *
 * مكون خالص (لا يعتمد على واجهات المتصفح أثناء العرض) لتجنب أخطاء الترطيب.
 */
export function QuranText({ ayahs, fontSize = 18, className }: Props) {
  return (
    <p
      dir="rtl"
      className={cn(
        "font-quran quran-font text-foreground leading-[2.5] [word-spacing:0.05em]",
        className,
      )}
      style={{ fontSize: `${fontSize}px` }}
    >
      {ayahs.map((ayah) => (
        <React.Fragment key={ayah.number}>
          <span className="inline">{ayah.text}</span>
          <span
            className="inline-flex items-center text-[0.7em] text-primary-ink mx-[0.3em] whitespace-nowrap leading-none px-1.5"
            aria-label={`رقم الآية ${toAyahNumber(ayah.number)}`}
          >
            {/* الرقم وحده: الخط يركّبه في زخرفة علامة الآية كاملة */}
            {toAyahNumber(ayah.number)}
          </span>
        </React.Fragment>
      ))}
    </p>
  );
}
