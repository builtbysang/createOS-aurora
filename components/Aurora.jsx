"use client";

import { Renderer, Program, Mesh, Color, Triangle } from "ogl";
import { useEffect, useRef } from "react";
import "./Aurora.css";

const VERT = `#version 300 es
in vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const FRAG = `#version 300 es
precision highp float;

uniform float uTime;
uniform float uAmplitude;
uniform vec3 uColorStops[3];
uniform vec2 uResolution;
uniform float uBlend;
uniform float uDrift;
uniform float uIntensity;

out vec4 fragColor;

vec3 permute(vec3 x) {
  return mod(((x * 34.0) + 1.0) * x, 289.0);
}

float snoise(vec2 v){
  const vec4 C = vec4(
      0.211324865405187, 0.366025403784439,
      -0.577350269189626, 0.024390243902439
  );
  vec2 i = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);

  vec3 p = permute(
      permute(i.y + vec3(0.0, i1.y, 1.0))
    + i.x + vec3(0.0, i1.x, 1.0)
  );

  vec3 m = max(
      0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)),
      0.0
  );
  m = m * m;
  m = m * m;

  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);

  vec3 g;
  g.x = a0.x * x0.x + h.x * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

struct ColorStop {
  vec3 color;
  float position;
};

#define COLOR_RAMP(colors, factor, finalColor) {              \
  int index = 0;                                               \
  for (int i = 0; i < 2; i++) {                                \
    ColorStop currentColor = colors[i];                        \
    bool isInBetween = currentColor.position <= factor;        \
    index = int(mix(float(index), float(i), float(isInBetween))); \
  }                                                             \
  ColorStop currentColor = colors[index];                      \
  ColorStop nextColor = colors[index + 1];                     \
  float range = nextColor.position - currentColor.position;    \
  float lerpFactor = (factor - currentColor.position) / range; \
  finalColor = mix(currentColor.color, nextColor.color, lerpFactor); \
}

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution;

  ColorStop colors[3];
  colors[0] = ColorStop(uColorStops[0], 0.0);
  colors[1] = ColorStop(uColorStops[1], 0.5);
  colors[2] = ColorStop(uColorStops[2], 1.0);

  vec3 rampColor;
  COLOR_RAMP(colors, uv.x, rampColor);

  // ReactBits-like core wave
  float drift = uDrift * 0.55;
  float baseNoise = snoise(vec2(uv.x * 2.0 + drift + uTime * 0.1, uTime * 0.25));
  float height = baseNoise * 0.5 * uAmplitude;
  height = exp(height);
  height = (uv.y * 2.0 - height + 0.2);
  float coreIntensity = 0.6 * height;

  float midPoint = 0.20;
  float coreAlpha = smoothstep(midPoint - uBlend * 0.5, midPoint + uBlend * 0.5, coreIntensity);
  vec3 coreColor = coreIntensity * rampColor;

  // Smooth pass for soft, thick gradients
  float softNoiseA = snoise(vec2(uv.x * 0.9 + drift * 0.3 + uTime * 0.04, 4.0 + uTime * 0.03));
  float softNoiseB = snoise(vec2(uv.x * 0.55 - uTime * 0.03, 13.0));
  float softNoise = softNoiseA * 0.7 + softNoiseB * 0.3;
  float softCenter = 0.30 + softNoise * 0.10;
  float softSpread = 0.40;
  float softBand = exp(-pow((uv.y - softCenter) / softSpread, 2.0));
  float softAlpha = softBand * 0.55 * uBlend;
  vec3 softColor = rampColor * (0.45 + softBand * 0.35);

  float alpha = clamp((coreAlpha * 0.66 + softAlpha) * uIntensity, 0.0, 0.94);
  vec3 baseColor = mix(coreColor * 0.86 + softColor * 1.02, vec3(1.0), 0.095);
  // Soft tone-map to prevent yellow highlight clipping.
  vec3 toneMapped = baseColor / (vec3(1.0) + baseColor * 0.95);
  // Keep blue channel brighter while constraining warm highlights.
  toneMapped = min(toneMapped, vec3(1.08, 1.02, 1.08));
  toneMapped.b *= 1.30;
  toneMapped.g *= 1.14;
  fragColor = vec4(toneMapped * alpha, alpha);
}
`;

export default function Aurora({
  colorStops = ["#fef08a", "#1d4ed8", "#f0f9ff"],
  amplitude = 1.0,
  blend = 0.52,
  speed = 1.0,
  intensity = 1.0,
}) {
  const propsRef = useRef({ colorStops, amplitude, blend, speed, intensity });
  const containerRef = useRef(null);

  useEffect(() => {
    propsRef.current = { colorStops, amplitude, blend, speed, intensity };
  }, [colorStops, amplitude, blend, speed, intensity]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const renderer = new Renderer({
      alpha: true,
      premultipliedAlpha: true,
      antialias: true,
      dpr: Math.min(window.devicePixelRatio || 1, 2),
    });

    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, 0);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    gl.canvas.style.backgroundColor = "transparent";

    const geometry = new Triangle(gl);
    if (geometry.attributes.uv) {
      delete geometry.attributes.uv;
    }

    const toRGB = (hex) => {
      const c = new Color(hex);
      return [c.r, c.g, c.b];
    };

    const program = new Program(gl, {
      vertex: VERT,
      fragment: FRAG,
      uniforms: {
        uTime: { value: 0 },
        uAmplitude: { value: amplitude },
        uColorStops: { value: colorStops.map(toRGB) },
        uResolution: { value: [container.offsetWidth, container.offsetHeight] },
        uBlend: { value: blend },
        uDrift: { value: 0 },
        uIntensity: { value: intensity },
      },
    });

    const mesh = new Mesh(gl, { geometry, program });
    container.appendChild(gl.canvas);

    const resize = () => {
      const width = container.offsetWidth;
      const height = container.offsetHeight;
      renderer.setSize(width, height);
      program.uniforms.uResolution.value = [width, height];
    };
    resize();
    window.addEventListener("resize", resize);

    let raf = 0;
    const tick = (t) => {
      raf = requestAnimationFrame(tick);

      const current = propsRef.current;
      const normalized = t * 0.001 * current.speed;
      const pingPong = Math.sin(normalized * 0.55) * 0.9;

      program.uniforms.uTime.value = normalized;
      program.uniforms.uDrift.value = pingPong;
      program.uniforms.uAmplitude.value = current.amplitude;
      program.uniforms.uBlend.value = current.blend;
      program.uniforms.uIntensity.value = current.intensity;
      program.uniforms.uColorStops.value = current.colorStops.map(toRGB);

      renderer.render({ scene: mesh });
    };

    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      if (gl.canvas.parentNode === container) {
        container.removeChild(gl.canvas);
      }
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, [amplitude, blend, colorStops, speed, intensity]);

  return <div ref={containerRef} className="aurora-container" />;
}
