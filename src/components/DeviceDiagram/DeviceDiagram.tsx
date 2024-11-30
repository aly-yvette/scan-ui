import { MutableRefObject, Suspense, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { Html, OrbitControls, OrthographicCamera, Stats, useDetectGPU } from '@react-three/drei';
import { DeviceModel } from './DeviceModel';
import BarcodeWidget from '../BarcodeWidget/BarcodeWidget';

type Props = { scanning: boolean, placeholderHeight: number }

export default function DeviceDiagram({ scanning, placeholderHeight = 0 }: Props) {
    const portalRef = useRef<HTMLElement>(document.body)
    const GPUTier = useDetectGPU()

    return <div style={{ width: "500px", height: "500px" }}>
        <div>Your GPU Tier is {GPUTier.gpu} {GPUTier.device} </div>

        <Canvas shadows='soft' frameloop='always'>
            <Stats />

            <Suspense fallback={null}>
                <OrthographicCamera
                    name="Camera"
                    makeDefault={true}
                    zoom={200}
                    far={100}
                    near={0.1}
                    position={[6.911, 5.547, 6.893]}
                    rotation={[-0.685, 0.659, 0.464]}
                />
                <pointLight
                    castShadow={true}
                    intensity={5}
                    // distance={10}
                    decay={1}
                    position={[0, 3, 0]}
                    rotation={[0, 0, 0]}
                />

                <Html position={[0, 0.9, 0]} portal={portalRef} style={{ marginLeft: '100px' }}>
                    <BarcodeWidget barcode={{ code: '3124321', type: "Test" }} />
                </Html>


                <DeviceModel scanning={scanning} placeholderHeight={placeholderHeight} />
                <OrbitControls />
                <ambientLight intensity={0.5} />
            </Suspense>
        </Canvas>

    </div>

}
