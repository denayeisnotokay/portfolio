import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";

import {useRef, useState} from "react";

export default function WebDev({ container }) {
    const [ animateCursor, setAnimateCursor ] = useState(false);

    const title = useRef();

    gsap.registerPlugin(ScrollTrigger, TextPlugin);

    const { contextSafe } = useGSAP(() => {
        gsap.from(title.current, {
            text: '',
            scrollTrigger: {
                trigger: title.current,
                start: 'top bottom',
                end: 'bottom top',
                toggleActions: 'restart pause resume reset',
                onToggle: (self) => {
                    setAnimateCursor(!self.isActive);
                },
            },
            duration: 5,
            onComplete: () => {
                setAnimateCursor(true);
            }
        })
    }, {scope: container});

    return <div id={'webDev'} className={'w-full h-screen flex flex-col justify-start items-start p-4 sm:p-8 pt-20 sm:pt-24 text-orange-500'}>
        <h2 ref={title} className={'font-mono text-left relative cursor' + (animateCursor ? ' animate' : '')}>--web-development:<span className={'text-transparent'}>|</span></h2>
    </div>
}