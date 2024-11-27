import Swal from "sweetalert2";

const showAlert = ({ title }) => {
  return Swal.fire({
    icon: "info",
    title,
    confirmButtonText: "Yes",
    confirmButtonColor: "#429f50",
  });
};

export default showAlert;
