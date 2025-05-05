import { useEffect, useState } from 'react'

import {
  Autocomplete,
  Box,
  Button,
  Dialog,
  FormControl,
  InputLabel,
  List,
  ListItem,
  MenuItem,
  Select,
  Switch,
  TextField,
  Typography
} from '@mui/material'
import axios from 'axios'

import toast from 'react-hot-toast'

import { ContentItemCard } from './content-item-card'
import { ContentItemForm } from './content-item-form'

export const ShipmentForm = ({ shipment, action }) => {
  const [cities, setCities] = useState([])
  const [areas, setAreas] = useState([])
  const [products, setProducts] = useState([])
  const [selectedProductsMap, setSelectedProductsMap] = useState({})
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [citiesLoadingStatus, setCitiesLoadingStatus] = useState('none')
  const [suggestedConsignees, setSuggestedConsignees] = useState(null)
  const [isConsigneeLoading, setIsConsigneeLoading] = useState(false)

  const [formData, setFormData] = useState(
    shipment || {
      content: [],
      name: '',
      city: null,
      area: null,
      address: '',
      phone: '',
      notes: ''
    }
  )

  // const [errors, setErrors] = useState({});

  useEffect(() => {
    if (formData.city) {
      axios
        .get(`/api/opost/cities/${formData.city.value}/areas`)
        .then(areasResponse => {
          setAreas(areasResponse.data.areas || [])
        })
        .catch(err =>
          toast.error('حدث خطأ ما, حاول مجددا', {
            duration: 3000
          })
        )
    }
  }, [formData.city])

  useEffect(() => {
    if (citiesLoadingStatus === 'none') {
      setCitiesLoadingStatus('loading')
      axios
        .get('/api/opost/cities')
        .then(citiesResponse => {
          setCities(citiesResponse.data.cities || [])
        })
        .catch(err =>
          toast.error('حدث خطأ ما, حاول مجددا', {
            duration: 3000
          })
        )
        .finally(() => {
          setCitiesLoadingStatus('ready')
        })
    }
  }, [citiesLoadingStatus])

  useEffect(() => {
    axios
      .get('/api/products')
      .then(productsResponse => {
        setProducts(productsResponse.data.products || [])
      })
      .catch(err =>
        toast.error('حدث خطأ ما, حاول مجددا', {
          duration: 3000
        })
      )
  }, [])

  useEffect(() => {
    if (formData.phone && formData.phone.length === 10) {
      setIsConsigneeLoading(true)
      axios
        .get(`/api/consignees/search`, { params: { phone: formData.phone } })
        .then(res => {
          if (res.data.consignees.length) {
            setSuggestedConsignees(res.data.consignees)
          } else {
            setSuggestedConsignees(null)
          }

          setIsConsigneeLoading(false)
        })
        .catch(_err => {
          toast.error('حدث خطأ اثناء احضار المقترحات، حاول مجدداً', {
            duration: 3000
          })
          setIsConsigneeLoading(false)
          setSuggestedConsignees(null)
        })
    }
  }, [formData.phone])

  const onConsigneeSelect = async consignee => {
    setIsConsigneeLoading(true)
    const consigneeCity = cities.find(city => city.label === consignee.cityName)

    if (!consigneeCity) {
      toast.error('حدث خطأ اثناء احضار المدينة، حاول مجدداً', {
        duration: 3000
      })

      return
    }

    const areasResponse = await axios.get(`/api/opost/cities/${consigneeCity.value}/areas`)

    if (!areasResponse.data.areas?.length) {
      toast.error('حدث خطأ اثناء احضار المناطق، حاول مجدداً', {
        duration: 3000
      })

      return
    }

    const consigneeArea = areasResponse?.data?.areas?.find(area => area.label === consignee.areaName)

    setFormData({
      ...formData,
      name: consignee.name,
      city: consigneeCity,
      area: consigneeArea,
      address: consignee.address,
      phone: consignee.phone
    })
    setIsConsigneeLoading(false)
    setSuggestedConsignees(null)
  }

  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleAddProduct = value => {
    setFormData({
      ...formData,
      content: [...formData.content, value]
    })
  }

  const handleRemoveProduct = index => {
    setFormData({
      ...formData,
      content: formData.content.filter((_, currIndex) => currIndex !== index)
    })
  }

  const createShipment = async () => {
    await action({
      content: formData.content,
      name: formData.name,
      cityId: formData.city.value,
      areaId: formData.area.value,
      address: formData.address,
      phone: formData.phone,
      total: formData.total,
      notes: formData.notes,
      hasReturn: false,
      returnNotes: ''
    })
  }

  return (
    <>
      <Box>
        <Box pt={2}>
          <Box>
            <Typography variant='h6'>المحتويات</Typography>
          </Box>
          <Box pt={2}>
            <Button variant='outlined' color='primary' onClick={() => setIsDialogOpen(true)}>
              اختيار
            </Button>
          </Box>
          <Box pt={2}>
            {formData.content.map((contentItem, i) => (
              <ContentItemCard
                key={i}
                product={selectedProductsMap[contentItem.productId]}
                contentItem={contentItem}
                onRemove={() => handleRemoveProduct(i)}
              />
            ))}
          </Box>
        </Box>
        <Box pt={2}>
          <TextField
            value={formData.name}
            name='name'
            label='اسم المستلم'
            variant='outlined'
            fullWidth
            sx={{ mt: 2 }}
            onChange={handleChange}
          />
        </Box>
        <Box pt={2}>
          <Autocomplete
            options={cities}
            renderInput={params => <TextField {...params} label='المدينة' variant='outlined' />}
            getOptionLabel={option => option?.label}
            getOptionKey={option => `${option.value}-${option.label}`}
            onChange={(_, newValue) => {
              setFormData({
                ...formData,
                city: newValue
              })
            }}
            value={formData.city}
            sx={{ mt: 2 }}
          />
        </Box>
        <Box pt={2}>
          <Autocomplete
            options={areas}
            renderInput={params => <TextField {...params} label='المنطقة' variant='outlined' />}
            getOptionLabel={option => option?.label}
            getOptionKey={option => `${option.value}-${option.label}`}
            onChange={(_, newValue) => {
              setFormData({
                ...formData,
                area: newValue
              })
            }}
            value={formData.area}
            sx={{ mt: 2 }}
          />
        </Box>
        <Box pt={2}>
          <TextField
            value={formData.address}
            name='address'
            label='العنوان'
            variant='outlined'
            fullWidth
            sx={{ mt: 2 }}
            onChange={handleChange}
          />
        </Box>
        <Box pt={2}>
          <TextField
            value={formData.phone}
            name='phone'
            label='الهاتف'
            variant='outlined'
            fullWidth
            sx={{ mt: 2 }}
            onChange={handleChange}
          />
        </Box>
        <Box pt={2}>
          <TextField name='total' label='التحصيل' variant='outlined' fullWidth sx={{ mt: 2 }} onChange={handleChange} />
        </Box>
        <Box pt={2}>
          <TextField name='notes' label='ملاحظات' variant='outlined' fullWidth onChange={handleChange} />
        </Box>
        <Box pt={2}>
          <Switch
            name='hasReturn'
            onChange={e => {
              setFormData({
                ...formData,
                hasReturn: e.target.checked
              })
            }}
          />
          <label>Has Return</label>
        </Box>
        {formData.hasReturn && (
          <Box pt={2}>
            <TextField
              name='returnNotes'
              label='ملاحظات الارجاع'
              variant='outlined'
              fullWidth
              onChange={handleChange}
            />
          </Box>
        )}
        <Box pt={2} display='flex' justifyContent='flex-end'>
          <Button variant='contained' color='primary' onClick={createShipment}>
            Create
          </Button>
        </Box>
      </Box>
      <Dialog open={isDialogOpen} onClose={() => ''} fullScreen>
        <ContentItemForm
          products={products}
          action={(conentItemData, prod) => {
            handleAddProduct(conentItemData)
            setSelectedProductsMap({
              ...selectedProductsMap,
              [prod._id]: prod
            })
            setIsDialogOpen(false)
          }}
        />
      </Dialog>
      <Dialog open={Boolean(suggestedConsignees || isConsigneeLoading)} onClose={() => ''} fullScreen>
        {isConsigneeLoading ? (
          <Box>
            <Typography variant='h6'>Loading...</Typography>
          </Box>
        ) : (
          <Box>
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
              {suggestedConsignees?.map(consignee => (
                <ListItem key={`consignee-${consignee.id}`} onClick={() => onConsigneeSelect(consignee)}>
                  {consignee.name}
                </ListItem>
              ))}
            </List>
          </Box>
        )}
      </Dialog>
    </>
  )
}
