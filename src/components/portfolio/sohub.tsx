"use client";

import { useRef, type ReactNode } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
  useInView,
} from "framer-motion";
import { ArrowUpRight } from "@phosphor-icons/react";

const EASE = [0.22, 1, 0.36, 1] as const;

/* ── Magnetic pill button with an arrow that swaps on hover (SOHub move) ── */
export function MagneticButton({
  children,
  href,
  target,
  rel,
  onClick,
  variant = "primary",
  className = "",
  icon = true,
}: {
  children: ReactNode;
  href?: string;
  target?: string;
  rel?: string;
  onClick?: () => void;
  variant?: "primary" | "ink" | "ghost";
  className?: string;
  icon?: boolean;
}) {
  const ref = useRef<HTMLAnchorElement & HTMLButtonElement>(null);
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 });

  const onMove = (e: React.MouseEvent) => {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * 0.3);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.3);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const palette =
    variant === "primary"
      ? "bg-primary text-primary-foreground"
      : variant === "ink"
        ? "bg-ink text-[oklch(0.99_0_0)]"
        : "bg-transparent text-foreground border border-border";

  const circle =
    variant === "ghost" ? "bg-foreground/[0.06] text-foreground" : "bg-black/15 text-current";

  const inner = (
    <>
      <span className="text-sm lg:text-base font-medium tracking-tight pl-6 pr-4 py-3">
        {children}
      </span>
      {icon && (
        <span
          className={`relative overflow-hidden flex items-center justify-center w-10 h-10 rounded-full mr-1 ${circle}`}
        >
          <span className="block transition-transform duration-500 ease-[cubic-bezier(.22,.68,0,1.5)] group-hover:translate-x-[180%] group-hover:-translate-y-[180%]">
            <ArrowUpRight size={16} weight="bold" />
          </span>
          <span className="absolute block -translate-x-[180%] translate-y-[180%] transition-transform duration-500 ease-[cubic-bezier(.22,.68,0,1.5)] group-hover:translate-x-0 group-hover:translate-y-0">
            <ArrowUpRight size={16} weight="bold" />
          </span>
        </span>
      )}
    </>
  );

  const cls = `group inline-flex items-center rounded-full select-none will-change-transform ${palette} ${className}`;

  if (href) {
    return (
      <motion.a
        ref={ref}
        href={href}
        target={target}
        rel={rel}
        onMouseMove={onMove}
        onMouseLeave={reset}
        style={{ x: sx, y: sy }}
        className={cls}
      >
        {inner}
      </motion.a>
    );
  }
  return (
    <motion.button
      ref={ref}
      onClick={onClick}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ x: sx, y: sy }}
      className={cls}
    >
      {inner}
    </motion.button>
  );
}

/* ── Masked, line-by-line reveal for big editorial headlines ── */
export function RevealText({
  lines,
  className = "",
  delay = 0,
  as: Tag = "h2",
  animateOnMount = false,
}: {
  lines: ReactNode[];
  className?: string;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "p";
  animateOnMount?: boolean;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLHeadingElement>(null);
  const inView = useInView(ref, { once: true, margin: "-12% 0px" });
  const play = animateOnMount || inView;
  return (
    <Tag ref={ref} className={className}>
      {lines.map((line, i) => (
        <span key={i} className="reveal-mask">
          <motion.span
            className="block"
            initial={reduce ? false : { y: "110%" }}
            animate={reduce ? { y: "0%" } : { y: play ? "0%" : "110%" }}
            transition={{ duration: 0.85, ease: EASE, delay: delay + i * 0.09 }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

/* ── Generic scroll reveal (fade + rise + slight scale) ── */
export function Reveal({
  children,
  className = "",
  delay = 0,
  y = 28,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y, scale: 0.985 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.7, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}
