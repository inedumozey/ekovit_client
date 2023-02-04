import Spinner_ from 'react-spinner-material';

function Spinner({ size, color = "#0988ed" }) {

  return (
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
  )
}

export default Spinner;
