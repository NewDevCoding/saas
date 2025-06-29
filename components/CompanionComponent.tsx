"use client"

import { cn, configureAssistant, getSubjectColor } from '@/lib/utils'
import { vapi } from '@/lib/vapi.sdk'
import Lottie, { LottieRefCurrentProps } from 'lottie-react'
import Image from 'next/image'
import React, { use, useEffect, useRef, useState } from 'react'
import soundwaves from '@/constants/soundwaves.json'
import { ServerInsertedMetadata } from 'next/dist/server/route-modules/app-page/vendored/contexts/entrypoints'

enum CallStatus {
    INACTIVE = 'INACTIVE',
    ACTIVE = 'ACTIVE',
    CONNECTING = 'CONNECTING',
    FINISHED = 'FINISHED',
}

const CompanionComponent = ({companionId, subject, topic, name, userName, userImage, style, voice}: CompanionComponentProps) => {
  
    const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [isMuted, setIsMuted] = useState(false);

    const lottieRef = useRef<LottieRefCurrentProps>(null);


    useEffect(() => {
        if (lottieRef) {
            if(isSpeaking) {
                lottieRef.current?.play();
            } else {
                lottieRef.current?.stop();
            }
        }
    }, [isSpeaking, lottieRef]);


    useEffect(() => {
        const onCallStart = () => {
            setCallStatus(CallStatus.ACTIVE);
        }

        const onCallEnd = () => {
            setCallStatus(CallStatus.FINISHED);
        }

        const onSpeechStart = () => {
            setIsSpeaking(true);
        }

        const onSpeechEnd = () => {
            setIsSpeaking(false);
        }

        const onMessage = () => {}

        const onError = (error: Error) => console.log('Error', error)
    
        vapi.on('call-start', onCallStart)
        vapi.on('call-end', onCallEnd)
        vapi.on('message', onMessage)
        vapi.on('error', onError)
        vapi.on('speech-start', onSpeechStart)
        vapi.on('speech-end', onSpeechEnd)

        return () => {
            vapi.off('call-start', onCallStart)
            vapi.off('call-end', onCallEnd)
            vapi.off('message', onMessage)
            vapi.off('error', onError)
            vapi.off('speech-start', onSpeechStart)
            vapi.off('speech-end', onSpeechEnd)

        }
    }, [])

    const toggleMicrophone = () => {
        const isMuted = vapi.isMuted();
        vapi.setMuted(!isMuted);

        setIsMuted(!isMuted);
    }

    const handleCall = async () => {
        setCallStatus(CallStatus.CONNECTING)

        const assistantOverrides = {
            variableValues: {
                subject, topic, style
            },
            clientMessages: ['transcript'],
            serverMessages: [],

        }
        // @ts-expect-error
        vapi.start(configureAssistant(voice, style), assistantOverrides)
    }

    const handleDisconnect = async () => {
        setCallStatus(CallStatus.FINISHED);
        vapi.stop()
    }

    return (
    <section className='flex flex-col h-[70vh]'>
        <section className='flex gap-8 max-sm:flex-col'>
            <div className='companion-section'>
                <div className='companion-avatar' style={{
                    backgroundColor: getSubjectColor(subject)
                }}>

                    <div 
                        className={cn(
                            'absolute-transition-opacity duration-1000', 
                            callStatus === CallStatus.FINISHED || callStatus === CallStatus.INACTIVE ? 'opacity-100' : 'opacity-0',
                            callStatus === CallStatus.CONNECTING && 'opacity-100 animate-pulse')}
                            >
                        <Image 
                            src={`/icons/${subject}.svg`}
                            alt={subject}
                            width={150}
                            height={150}
                            className='max-sm:w-fit'
                        ></Image>

                        <div className={cn('absolute transition-opacity duration-1000', callStatus === CallStatus.ACTIVE ? 'opacity-100': 'opacity-0' )}>
                            <Lottie 
                                lottieRef={lottieRef}
                                animationData={soundwaves}
                                autoplay={false}
                                className='companion-lottie'
                            />
                        </div>
                    </div>

                    <p className='font-bold text-2xl'>{name}</p>

                </div>

                
            </div>
            <div className='user-section'>
                    <div className='user-avatar'>
                        <Image 
                            src={userImage}
                            alt='username'
                            width={130}
                            height={130}
                        
                        ></Image>
                        <p className='font-bold text-2xl'>{userName}</p>
                    </div>
                    <button className='btn-mic' onClick={toggleMicrophone}
                    >
                        <Image 
                            src={isMuted ? '/icons/mic-off.svg' : '/icons/mic-on.svg'}
                            alt='microphone'
                            width={36}
                            height={36}
                        ></Image>
                        <p className='max-sm:hidden '>
                            {isMuted ? 'Turn on microphone' : 'Turn off microphone'}
                        </p>
                    </button>
                    <button className={cn('rounded-lg py-2 cursor-pointer transition-colors w-full text-white', callStatus === CallStatus.ACTIVE ? 'bg-red-700' : 'bg-primary', callStatus === CallStatus.CONNECTING && 'animate-pulse')} onClick={callStatus === CallStatus.ACTIVE ? handleDisconnect : handleCall} >
                        {callStatus === CallStatus.ACTIVE 
                            ? 'End Session' 
                        : callStatus === CallStatus.CONNECTING 
                            ? 'Connecting...' 
                        : 'Start Session'}
                    </button>
                </div>
        </section>

        <section className='transcript'>
            <div className='transcript-message no-scrollbar'>
                MESSAGES
            </div>

            <div className='transcript-fade'>
                        
            </div>
        </section>
    </section>

  )
}
export default CompanionComponent