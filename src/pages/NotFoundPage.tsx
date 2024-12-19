import { Link } from "react-router-dom"

export const NotFoundPage = () => {
  return <>
    Page not found.  Please go back to <Link to="/">Home</Link> and try again.
  </>
}
