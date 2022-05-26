import { useContext } from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import styled from 'styled-components';
import PercentageContext from '../contexts/PercentageContext';

function CircularProgression(){

  const {percentage, setPercentage} = useContext(PercentageContext);
  setPercentage(45);

    return (
    <Container>
      <CircularProgressbar
        percentage={percentage}
        text={`${percentage}%`}
        background
        backgroundPadding={6}
        styles={{
          background: {
            fill: "#3e98c7"
          },
          text: {
            fill: "#fff"
          },
          path: {
            stroke: "#fff"
          },
          trail: { stroke: "transparent" }
        }}
      />
    </Container>
    )
}

export default CircularProgression;

const Container = styled.div`
  width:70px;
  height: 70px;
  font-family: 'Lexend Deca';
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 22px;

`