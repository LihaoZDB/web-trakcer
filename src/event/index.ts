import type { EventDto } from "@en/common/tracker";

export const reportEvent = (visitorId: string) => {
  const nodeName = 'BUTTON'
    const spanName = 'SPAN'
    const inputName = 'INPUT'
    document.addEventListener('click', (e: MouseEvent) => {
        const target = e.target as HTMLElement
        const sendEvent = () => {
            const react = target.getBoundingClientRect()
            const body: EventDto = {
                visitorId,
                event: e.type,
                payload: {
                    x: react.left.toFixed(2) || 0,
                    y: react.top.toFixed(2) || 0,
                    width: react.width.toFixed(2) || 0,
                    height: react.height.toFixed(2) || 0,
                    text: target.textContent,
                },
                url: window.location.href,
            }
            console.log(body)
        }
        if (target.nodeName === nodeName) {
            sendEvent()
        }
        if (target.nodeName === spanName && target.parentElement?.nodeName === nodeName) {
            sendEvent()
        }
    })
};
