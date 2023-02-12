import Spinner_ from 'react-spinner-material';
import { ThreeDots } from 'react-loader-spinner'

function Spinner({ size, color = "#0988ed", type = "spinner" }) {

  return (
    type !== 'dots' ?

      <div style={{
        height: '30px',
        width: '100%',
        display: 'flex',
        justifyContent: 'center'
      }}>
        <Spinner_
          style={{ color }}
          radius={(function () {
            if (size == "md") return 30
            else if (size == "lg") return 40
            else return 20
          }())}
          color={color}
          stroke={2}
          visible={true}
        />
      </div>
      :
      <div style={{
        height: '30px',
        width: '100%',
        display: 'flex',
        justifyContent: 'center'
      }}>
        <ThreeDots
          height="30"
          width="50"
          radius="9"
          color={color}
          ariaLabel="three-dots-loading"
          visible={true}
        />
      </div>
  )
}

export default Spinner;
