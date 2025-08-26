// useIntersectionObserver 监听元素是否进入视口
export function useIntersectionObserver() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        console.log('元素进入视口');
      }
    });
  });
  return observer;
}