'use client'
import { useEffect, useState } from 'react'

import { useRouter } from 'next/navigation'

import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  List,
  ListItem,
  ListItemText,
  Typography
} from '@mui/material'
import axios from 'axios'

import toast from 'react-hot-toast'

import { ShipmentStatusColors, ShipmentStatuses, ShipmentStatusLabels } from '@/@core/constants/shipment'

const ShipmentsList = () => {
  const [shipments, setShipments] = useState([])
  const [pendingShipmentToSolve, setPendingShipmentToSolve] = useState(null)
  const router = useRouter()

  useEffect(() => {
    axios
      .get('/api/shipments')
      .then(shipmentsResponse => {
        setShipments(shipmentsResponse.data.shipments || [])
      })
      .catch(err =>
        toast.error('حدث خطأ ما, حاول مجددا', {
          duration: 3000
        })
      )
  }, [])

  const handleSolve = id => {
    axios
      .patch(`/api/shipments/${id}/solve`)
      .then(() => {
        setShipments(shipments.filter(shipment => shipment._id !== id))
      })
      .catch(err =>
        toast.error('حدث خطأ ما, حاول مجددا', {
          duration: 3000
        })
      )
      .finally(() => {
        setPendingShipmentToSolve(null)
      })
  }

  return (
    <>
      <Box>
        <Box pt={2}>
          <Box display='flex' justifyContent='space-between' alignItems='center' marginBottom={4}>
            <Typography variant='h4'>الشحنات</Typography>
            <Button variant='contained' color='primary' onClick={() => router.push('/shipments/create')}>
              اضافة شحنة
            </Button>
          </Box>
          <Box display='flex' flexWrap='wrap' gap={2}>
            {shipments.length === 0 && (
              <Box
                display='flex'
                justifyContent='center'
                alignItems='center'
                width='100%'
                height='100%'
                flexDirection='column'
              >
                <Typography variant='h6' color='gray'>
                  لا توجد شحنات
                </Typography>
              </Box>
            )}
            {shipments.map(shipment => (
              <Card key={shipment._id} dir='rtl' sx={{ width: '100%', maxWidth: 400, padding: 2 }}>
                <CardContent>
                  <Box>
                    <Box display='flex' justifyContent='space-between' alignItems='space-between'>
                      <Typography variant='h6'>{shipment.externalId}</Typography>
                      <Box
                        border={'1px solid #ccc'}
                        borderRadius='8px'
                        padding={1.5}
                        display='flex'
                        justifyContent='space-between'
                        alignItems='center'
                      >
                        <Typography variant='h6'>{shipment.total - shipment.shipmentFees} شيكل</Typography>
                      </Box>
                    </Box>
                    <Box display='flex' alignItems='center'>
                      <Typography variant='body1' marginInlineEnd={2}>
                        الحالة:
                      </Typography>
                      <Chip
                        size='small'
                        color={ShipmentStatusColors[shipment.status]}
                        label={ShipmentStatusLabels[shipment.status]}
                      />
                    </Box>
                    <Typography variant='h6' mt={2}>
                      المجموع: {shipment.total} شيكل
                    </Typography>
                    <Typography variant='h6' mt={2}>
                      التوصيل: {shipment.shipmentFees} شيكل
                    </Typography>
                  </Box>
                  <Box mt={2}>
                    <Typography variant='body1'>المحتويات: </Typography>
                    <List>
                      {shipment.content.map(contentItem => (
                        <ListItem key={contentItem._id} style={{ padding: '0', margin: '16px 0' }}>
                          •{' '}
                          <ListItemText
                            primary={<Typography variant='body2'>{contentItem.product.name}</Typography>}
                            secondary={
                              <Typography variant='body2'>
                                القياس: {contentItem.size} | اللون: {contentItem.color}
                              </Typography>
                            }
                          />
                        </ListItem>
                      ))}
                    </List>
                  </Box>
                </CardContent>
                <CardActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Button
                    disabled={shipment.status === ShipmentStatuses.DONE}
                    size='medium'
                    variant='contained'
                    color='primary'
                    onClick={() => setPendingShipmentToSolve(shipment)}
                  >
                    {shipment.status === ShipmentStatuses.PENDING ? 'اكمال' : 'مكتمل'}
                  </Button>
                </CardActions>
              </Card>
            ))}
          </Box>
        </Box>
      </Box>
      <Dialog open={Boolean(pendingShipmentToSolve)} onClose={() => setPendingShipmentToSolve(null)} dir='rtl'>
        <DialogContent>
          <Typography variant='h6'>تأكيد اكمال الشحنة</Typography>
          <Typography variant='body1'>هل تريد اكمال الشحنة رقم {pendingShipmentToSolve?.externalId}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPendingShipmentToSolve(null)} color='primary' variant='contained'>
            الغاء
          </Button>
          <Button onClick={() => handleSolve(pendingShipmentToSolve._id)} color='error' autoFocus variant='contained'>
            اكمال
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default ShipmentsList
