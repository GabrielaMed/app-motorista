import { EnumStatusInvoiceTicket } from "../mocks";

import { MdCircle } from "react-icons/md";
import { DefaultPalettColors } from "./colors";

export const getIconStatus = (type: any) => {
  switch (type) {
    case EnumStatusInvoiceTicket.pending:
      return <MdCircle color={DefaultPalettColors.invoice.red} />;
    case EnumStatusInvoiceTicket.sent:
      return <MdCircle color={DefaultPalettColors.invoice.yellow} />;
    case EnumStatusInvoiceTicket.verified:
      return <MdCircle color={DefaultPalettColors.invoice.green} />;
    default:
      return <MdCircle color={DefaultPalettColors.invoice.red} />;
  }
};
