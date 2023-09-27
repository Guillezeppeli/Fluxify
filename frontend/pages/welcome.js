import Link from 'next/link';
import Lottie from 'react-lottie';
import { Typography, Button } from '@mui/material';
import animationData from '../src/assets/animations/animation_ln0lp12t.json';  // adjust the path accordingly

export default function WelcomePage() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Lottie options={defaultOptions} height={400} width={400} />
      <Typography variant="h4" gutterBottom>
        Welcome aboard, you're successfully registered!
      </Typography>
      
      <Link href="/login">
        <Button variant="contained" color="primary">
          Go to login
        </Button>
      </Link>
    </div>
  );
}



