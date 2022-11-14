export enum EnumStatusInvoiceTicket {
  pending = "pending",
  sent = "sent",
  verified = "verified",
}

export const customers = [
  { name: "Cliente SEMALO", address: "Av Guaicurus, 2348" },
];

export const invoices = [
  {
    invoice_number: 7,
    customer: customers[0],
    status: EnumStatusInvoiceTicket.pending,
  },
  {
    invoice_number: 6,
    customer: customers[0],
    status: EnumStatusInvoiceTicket.pending,
  },
  {
    invoice_number: 5,
    customer: customers[0],
    status: EnumStatusInvoiceTicket.sent,
  },
  {
    invoice_number: 4,
    customer: customers[0],
    status: EnumStatusInvoiceTicket.sent,
  },
  {
    invoice_number: 3,
    customer: customers[0],
    status: EnumStatusInvoiceTicket.verified,
  },
  {
    invoice_number: 2,
    customer: customers[0],
    status: EnumStatusInvoiceTicket.verified,
  },
  {
    invoice_number: 1,
    customer: customers[0],
    status: EnumStatusInvoiceTicket.verified,
  },
];
