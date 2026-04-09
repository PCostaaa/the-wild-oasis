import styled from "styled-components";
import { format, isToday, isValid } from "date-fns";

import Tag from "../../ui/Tag";
import Table from "../../ui/Table";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";

import { formatCurrency } from "../../utils/helpers";
import { formatDistanceFromNow } from "../../utils/helpers";
import PropTypes from "prop-types";
import Menus from "../../ui/Menus";
import {
  HiArrowDownOnSquare,
  HiArrowUpOnSquare,
  HiEye,
  HiTrash,
} from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { useCheckout } from "../check-in-out/useCheckout";
import { useDeleteBooking } from "./useDeleteBookings";

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }
`;

const Amount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  text-align: right;
`;

function BookingRow({ booking }) {
  const {
    id: bookingId,
    startDate,
    endDate,
    numNights,
    totalPrice,
    status,
    guests,
    cabins,
  } = booking || {};

  const startDateObj = startDate ? new Date(startDate) : null;
  const endDateObj = endDate ? new Date(endDate) : null;
  const { checkout, isCheckingOut } = useCheckout();
  const { deleteBooking, isDeleting } = useDeleteBooking();

  const dateDescription =
    startDateObj && isValid(startDateObj)
      ? isToday(startDateObj)
        ? "Today"
        : formatDistanceFromNow(startDateObj)
      : "Unknown";

  const formattedStartDate =
    startDateObj && isValid(startDateObj)
      ? format(startDateObj, "MMM dd yyyy")
      : "N/A";

  const formattedEndDate =
    endDateObj && isValid(endDateObj)
      ? format(endDateObj, "MMM dd yyyy")
      : "N/A";
  const navigate = useNavigate();
  const guestName = guests?.fullName || "Unknown";
  const email = guests?.email || "";
  const cabinName = cabins?.name || "Unknown";

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  const type = statusToTagName[status] || "blue";

  return (
    <Table.Row>
      <Cabin>{cabinName}</Cabin>

      <Stacked>
        <span>{guestName}</span>
        <span>{email}</span>
      </Stacked>

      <Stacked>
        <span>
          {dateDescription} &rarr; {numNights ?? 0} night stay
        </span>
        <span>
          {formattedStartDate} &mdash; {formattedEndDate}
        </span>
      </Stacked>

      <Tag type={type}>{status ? status.replace("-", " ") : "unknown"}</Tag>

      <Amount>{formatCurrency(totalPrice)}</Amount>

      <Modal>
        <Menus.Menu>
          <Menus.Toggle id={String(bookingId)} />
          <Menus.List id={String(bookingId)}>
            <Menus.Button
              icon={<HiEye />}
              onClick={() => navigate(`/bookings/${bookingId}`)}
            >
              See details
            </Menus.Button>

            {status === "unconfirmed" && (
              <Menus.Button
                icon={<HiArrowDownOnSquare />}
                onClick={() => navigate(`/checkin/${bookingId}`)}
              >
                Check in
              </Menus.Button>
            )}

            {status === "checked-in" && (
              <Menus.Button
                icon={<HiArrowUpOnSquare />}
                onClick={() => bookingId && checkout(bookingId)}
                disabled={isCheckingOut || !bookingId}
              >
                Check out
              </Menus.Button>
            )}

            <Modal.Open opens="delete">
              <Menus.Button icon={<HiTrash />}>Delete booking</Menus.Button>
            </Modal.Open>
          </Menus.List>
        </Menus.Menu>

        <Modal.Window name="delete">
          <ConfirmDelete
            resourceName="booking"
            disabled={isDeleting}
            onConfirm={() => deleteBooking(bookingId)}
          />
        </Modal.Window>
      </Modal>
    </Table.Row>
  );
}

export default BookingRow;

BookingRow.propTypes = {
  booking: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    created_at: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.instanceOf(Date),
    ]),
    startDate: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.instanceOf(Date),
    ]).isRequired,
    endDate: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)])
      .isRequired,
    numNights: PropTypes.number.isRequired,
    numGuests: PropTypes.number,
    totalPrice: PropTypes.number.isRequired,
    status: PropTypes.oneOf(["unconfirmed", "checked-in", "checked-out"])
      .isRequired,
    guests: PropTypes.shape({
      fullName: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
    }).isRequired,
    cabins: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
