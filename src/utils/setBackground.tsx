export const BackgroundColor = (status: any) => {
  if (status.includes("Overdue")) {
    return "#d50000";
  } else {
    switch (status) {
      case "Sent":
        return "rgba(102,187,106,0.3)";
      case "Pending payment":
        return "rgba(189,189,189,0.3)";
      case "Part payment":
        return "rgba(255,214,0,0.3)";
      case "Fully paid":
        return "rgba(102,187,106,0.3)";
      case "Active":
        return "rgba(102,187,106,0.3)";
      case "Inactive":
        return "rgba(213,0,0,0.3)";
      case "Successful":
        return "rgba(102,187,106,0.3)";
      case "Pending":
        return "rgba(189,189,189,0.3)";
      case "Probation":
        return "rgba(189,189,189,0.3)";
      case "Blacklisted":
        return "#979797";
      case "Deactivated":
        return "#979797";

      case "Terminated":
        return "rgba(213,0,0,0.3)";
      case "New Request":
        return "rgba(213,0,0,0.3)";
      case "In Progress":
        return "rgba(66,165,245,0.3)";
      case "Done":
        return "rgba(255,109,0,0.3)";
      case "Accepted":
        return "rgba(255,109,0,0.3)";
      case "Completed":
        return "#ffd600";
      case "Suspended":
        return "#ef9a9a";
      case "On leave":
        return "#616161";
      default:
        return "#3f3d56";
    }
  }
};
