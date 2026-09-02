interface ScrimPathParams {
  width: number;
  height: number;
  cutoutX: number;
  cutoutY: number;
  cutoutSize: number;
  cutoutRadius: number;
}

export const buildScrimPath = ({
  width,
  height,
  cutoutX,
  cutoutY,
  cutoutSize,
  cutoutRadius,
}: ScrimPathParams): string => {
  const left = cutoutX;
  const top = cutoutY;
  const right = cutoutX + cutoutSize;
  const bottom = cutoutY + cutoutSize;
  const r = cutoutRadius;

  return [
    `M0 0 H${width} V${height} H0 Z`,
    `M${left + r} ${top}`,
    `H${right - r}`,
    `A${r} ${r} 0 0 1 ${right} ${top + r}`,
    `V${bottom - r}`,
    `A${r} ${r} 0 0 1 ${right - r} ${bottom}`,
    `H${left + r}`,
    `A${r} ${r} 0 0 1 ${left} ${bottom - r}`,
    `V${top + r}`,
    `A${r} ${r} 0 0 1 ${left + r} ${top}`,
    "Z",
  ].join(" ");
};
