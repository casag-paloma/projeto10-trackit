import { ThreeDots } from  'react-loader-spinner';

function LoadingSpinner({height, width}){
    return (
        <ThreeDots color="#FFFFFF" height={height} width={width} />
    )

}


export default LoadingSpinner;