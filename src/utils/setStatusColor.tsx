export const StatusColor = (status: any) => {
  if (status?.includes("Overdue")) {
    return "#d50000";
  } else if (status?.includes("Pending payment")) {
    return "#bdbdbd";
  } else if (status?.includes("Part payment")) {
    return "#ffd600";
  } else {
    switch (status) {
      case "Sent":
        return "#66bb6a";

      case "Pending payment":
        return "#bdbdbd";

      case "Part payment":
        return "#ffd600";
      case "Driver_selected":
        return "#ffd600";
      case "Fixed":
        return "#66bb6a";

      case "Active":
        return "#1DCD00";
      case "Assigned":
        return "#1DCD00";
      case "Complete":
        return "#1DCD00";
      case "Completed":
        return "#1DCD00";
      case "Resolved":
        return "#1DCD00";
      case "Requested":
        return "#ffd600";
      case "Paid":
        return "#89CFF0";

      case "Successful":
        return "#66bb6a";
      case "Successfull":
        return "#66bb6a";

      case "Pending":
        return "#5A5A5A";
      case "Ongoing":
        return "#89CFF0";
      case "Inactive":
        return "#F72C2D";
      case "Not Fixed":
        return "#F72C2D";
      case "Not Paid":
        return "#F72C2D";
      case "Cancelled":
        return "#F72C2D";
      case "Canceled":
        return "#F72C2D";
      case "Unresolved":
        return "#F72C2D";
      case "Unassigned":
        return "#F72C2D";
      case "Blacklisted":
        return "#979797";

      case "Deactivated":
        return "#F72C2D";

      case "Accepted":
        return "#EA6307";

      case "Terminated":
        return "#d50000";

      case "Rejected":
        return "#d50000";

      case "New Request":
        return "#d50000";

      case "In Progress":
        return "#DB481B";

      case "Out for Repairs":
        return "#EA6307";

      case "Suspended":
        return "#ef9a9a";
      case "Select_driver":
        return "#ef9a9a";
      case "Arriving_pickup":
        return "#0B0B45";
              case "Arrived":
        return "#EA6307";
      case "On leave":
        return "#616161";

      default:
        return "#3f3d56";
    }
  }
};
