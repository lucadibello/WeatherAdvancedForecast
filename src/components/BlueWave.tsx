import { BackgroundColor } from "./Homepage";

interface WaveProps {
  color: string,
}
export default function BlueWave(props: WaveProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
      <path
        fill={props.color}
        fillOpacity="1"
        d="M0,128L40,112C80,96,160,64,240,58.7C320,53,400,75,480,117.3C560,160,640,224,720,229.3C800,235,880,181,960,154.7C1040,128,1120,128,1200,133.3C1280,139,1360,149,1400,154.7L1440,160L1440,0L1400,0C1360,0,1280,0,1200,0C1120,0,1040,0,960,0C880,0,800,0,720,0C640,0,560,0,480,0C400,0,320,0,240,0C160,0,80,0,40,0L0,0Z"
      ></path>
    </svg>
  );
}
