import PropTypes from "prop-types";

function Empty({ resourceName, message }) {
  return <p>{message || `No ${resourceName} could be found.`}</p>;
}

export default Empty;

Empty.propTypes = {
  resourceName: PropTypes.string,
  message: PropTypes.string,
};
