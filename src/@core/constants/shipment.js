
export const ShipmentStatuses = {
  PENDING: 'pending',
  DONE: 'done',
};

export const ShipmentStatusLabels = {
  [ShipmentStatuses.PENDING]: 'قيد الانتظار',
  [ShipmentStatuses.DONE]: 'مكتمل',
}

export const ShipmentStatusColors = {
  [ShipmentStatuses.PENDING]: 'error',
  [ShipmentStatuses.DONE]: 'success',
}
