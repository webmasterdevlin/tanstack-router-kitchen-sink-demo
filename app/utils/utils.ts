export async function loaderDelayFn<T>(fn: (...args: any[]) => Promise<T> | T) {
  const delay = Number(3000);
  const delayPromise = new Promise(r => {
    return setTimeout(r, delay);
  });

  await delayPromise;
  const res = await fn();

  return res;
}

export async function actionDelayFn<T>(fn: (...args: any[]) => Promise<T> | T) {
  const delay = Number(3000);
  await new Promise(r => {
    return setTimeout(r, delay);
  });
  return fn();
}

export function shuffle<T>(arr: T[]): T[] {
  let i = arr.length;
  if (i == 0) return arr;
  const copy = [...arr];
  while (--i) {
    const j = Math.floor(Math.random() * (i + 1));
    const a = copy[i];
    const b = copy[j];
    copy[i] = b!;
    copy[j] = a!;
  }
  return copy;
}
