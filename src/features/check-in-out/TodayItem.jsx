import styled from "styled-components";
import Tag from "../../ui/Tag";
import PropTypes from "prop-types";
import { Flag } from "../../ui/Flag";
import Button from "../../ui/Button";
import CheckoutButton from "./CheckoutButton";
import { Link } from "react-router-dom";

const StyledTodayItem = styled.li`
  display: grid;
  grid-template-columns: 9rem 2rem 1fr 7rem 9rem;
  gap: 1.2rem;
  align-items: center;

  font-size: 1.4rem;
  padding: 0.8rem 0;
  border-bottom: 1px solid var(--color-grey-100);

  &:first-child {
    border-top: 1px solid var(--color-grey-100);
  }

  @media (max-width: 480px) {
    grid-template-columns: 7rem 2rem 1fr 9rem;
    gap: 0.8rem;

    & > div:nth-child(4) {
      display: none;
    }
  }
`;

const Guest = styled.div`
  font-weight: 500;
`;

function TodayItem({ activity }) {
  const { id, status, guests, numNights } = activity;
  const guestCountry = guests.nationality ?? "Unknown country";

  return (
    <StyledTodayItem>
      {status === "unconfirmed" && <Tag type="green">Arriving</Tag>}
      {status === "checked-in" && <Tag type="blue">Departing</Tag>}

      <Flag src={guests.countryFlag} alt={`Flag of ${guestCountry}`} />

      <Guest>{guests.fullName}</Guest>
      <div>{numNights}</div>

      {status === "unconfirmed" && (
        <Button
          size="small"
          variation="primary"
          as={Link}
          to={`/checkin/${id}`}
        >
          Check in
        </Button>
      )}

      {status === "checked-in" && <CheckoutButton bookingId={id} />}
    </StyledTodayItem>
  );
}

export default TodayItem;

TodayItem.propTypes = {
  activity: PropTypes.shape({
    id: PropTypes.number.isRequired,
    status: PropTypes.string.isRequired,
    numNights: PropTypes.number.isRequired,
    guests: PropTypes.shape({
      countryFlag: PropTypes.string,
      nationality: PropTypes.string,
      fullName: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
