// external import
import { Button, Spinner } from "react-bootstrap"

const Loading = ({variant}) => {
  return (
      <Button variant={variant} disabled>
          <Spinner
              as="span"
              animation="grow"
              size="sm"
              role="status"
              aria-hidden="true"
          />
          Loading...
      </Button>
  )
}
export default Loading