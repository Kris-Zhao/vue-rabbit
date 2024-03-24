import { computed, onUnmounted, ref } from "vue";
import dayjs from "dayjs";

export const useCountDown = () => {
  const time = ref(0);

  const formatTime = computed(() => dayjs.unix(time.value).format("mm分ss秒"));

  let timer = null;
  const start = (currentTime) => {
    time.value = currentTime;
    timer = setInterval(() => {
      time.value--;
    }, 1000);
  };

  onUnmounted(() => timer && clearInterval(timer));

  return {
    formatTime,
    start,
  };
};
