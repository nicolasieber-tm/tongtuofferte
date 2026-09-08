'use client';
import { useEffect, useRef } from 'react';

/** Decorative particle field adapted from the supplied Particle Drift concept. */
export default function ParticleDrift() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    const parent = canvas?.parentElement;
    if (!canvas || !parent) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let width = 0, height = 0, frame = 0, last = 0, visible = false;
    let nodes: {x:number;y:number;speed:number;char:string}[] = [];
    let beams: {x:number;y:number;speed:number;length:number}[] = [];
    const chars = '0123456789+·:';
    // Seeded positions keep the composition stable on resize.
    const fraction = (i:number) => {const n = Math.sin(i * 127.1 + 311.7) * 43758.5453; return n - Math.floor(n)};
    function paint(dt:number) {
      if (!ctx) return;
      ctx.clearRect(0,0,width,height);
      ctx.font = '11px ui-monospace, monospace';
      for (const [i,n] of nodes.entries()) {
        n.y = (n.y + n.speed * dt) % (height + 20);
        const edge = Math.pow(Math.abs(n.x / width - .5) * 2, 1.4);
        ctx.fillStyle = `rgba(111,116,124,${.10 + edge * .25})`;
        ctx.fillText(n.char,n.x,n.y);
        const next = nodes[i+1];
        if(next && Math.hypot(n.x-next.x,n.y-next.y)<80){
          ctx.strokeStyle = `rgba(154,156,158,${edge*.12})`;ctx.lineWidth=.6;
          ctx.beginPath();ctx.moveTo(n.x,n.y);ctx.lineTo(next.x,next.y);ctx.stroke();
        }
      }
      for (const b of beams) {
        b.y -= b.speed * dt;
        if(b.y < -b.length) b.y = height + b.length;
        const gradient = ctx.createLinearGradient(b.x,b.y,b.x,b.y+b.length);
        gradient.addColorStop(0,'rgba(235,94,11,0)');
        gradient.addColorStop(.8,'rgba(235,94,11,.22)');
        gradient.addColorStop(1,'rgba(235,94,11,.55)');
        ctx.strokeStyle=gradient;ctx.lineWidth=1;
        ctx.beginPath();ctx.moveTo(b.x,b.y);ctx.lineTo(b.x,b.y+b.length);ctx.stroke();
      }
    }
    function tick(time:number) {
      frame=0;
      if(!visible || document.hidden || motion.matches) return;
      const dt=last?Math.min((time-last)/1000,.05):0;last=time;
      paint(dt);frame=requestAnimationFrame(tick);
    }
    function sync() {
      cancelAnimationFrame(frame);frame=0;last=0;
      paint(0);
      if(visible && !document.hidden && !motion.matches)frame=requestAnimationFrame(tick);
    }
    function resize() {
      if(!ctx || !canvas || !parent)return;
      width=parent.clientWidth;height=parent.clientHeight;
      const dpr=Math.min(window.devicePixelRatio || 1,2);
      canvas.width=Math.round(width*dpr);canvas.height=Math.round(height*dpr);
      ctx.setTransform(dpr,0,0,dpr,0,0);
      const count=width<760?30:76;
      nodes=Array.from({length:count},(_,i)=>({x:fraction(i+1)*width,y:fraction(i+150)*height,speed:4+fraction(i+250)*8,char:chars[Math.floor(fraction(i+350)*chars.length)]}));
      beams=Array.from({length:width<760?5:12},(_,i)=>({x:(i%2===0?fraction(i+450)*.28:.72+fraction(i+450)*.28)*width,y:fraction(i+550)*height,speed:18+fraction(i+650)*26,length:30+fraction(i+750)*65}));
      sync();
    }
    const sizeObserver=new ResizeObserver(resize);sizeObserver.observe(parent);
    const intersection=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;sync()});intersection.observe(parent);
    motion.addEventListener('change',sync);document.addEventListener('visibilitychange',sync);
    resize();
    return()=>{cancelAnimationFrame(frame);sizeObserver.disconnect();intersection.disconnect();motion.removeEventListener('change',sync);document.removeEventListener('visibilitychange',sync)};
  },[]);
  return <canvas ref={ref} className="particle-drift" aria-hidden="true"/>;
}
