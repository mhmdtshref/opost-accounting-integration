import { useState } from 'react'

import { Box, Typography } from '@mui/material'
import toast from 'react-hot-toast'
import { useTheme } from '@mui/material/styles'
import UploadIcon from 'mdi-material-ui/Upload'
import CancelIcon from 'mdi-material-ui/light/Cancel'
import axios from 'axios'

export const ImageUploader = ({ onBlur, onChange, value, title, name }) => {
  const [isLoading, setIsLoading] = useState(false)
  const theme = useTheme()

  const onImageInputValueChange = async event => {
    // TODO: Validate file;
    // Upload file;
    try {
      setIsLoading(true)
      const files = event.target.files

      if (!files?.length) {
        toast.error('فشل اختيار الصورة')

        return
      }

      const formData = new FormData()

      formData.append('file', files[0])

      const response = await axios.post('/api/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })

      const imageUrl = response?.data?.url

      if (!imageUrl) {
        toast.error('فشل رفع الصورة')

        return
      }

      onChange(imageUrl)
    } catch (error) {
      toast.error('فشل رفع الصورة')
    } finally {
      setIsLoading(false)
    }
  }

  const onClickClearImage = () => {
    onChange(null)
  }

  return (
    <Box sx={{ maxWidth: '100%', width: '100%' }}>
      <Box>
        <Typography variant='body1' mb={2}>
          {title}
        </Typography>
      </Box>
      <Box height='200px'>
        {value ? (
          <Box height='100%'>
            <Box height='100%' position='relative'>
              <img
                src={value}
                alt={name}
                width='100%'
                height='auto'
                style={{ maxHeight: '100%', objectFit: 'contain', position: 'relative' }}
              />
              <Box display='flex' justifyContent='flex-end' height='100%' width='100%'>
                <Box
                  borderRadius='100%'
                  position='absolute'
                  top='0'
                  right='0'
                  style={{ cursor: 'pointer', textDecoration: 'underline' }}
                  onClick={onClickClearImage}
                >
                  <CancelIcon
                    style={{
                      paddingBottom: 2,
                      paddingLeft: 1,
                      backgroundColor: theme.palette.background.paper,
                      borderRadius: '100%'
                    }}
                  />
                </Box>
              </Box>
            </Box>
          </Box>
        ) : (
          <Box height='100%'>
            <Box
              height='100%'
              bgcolor={theme.palette.background.default}
              display='flex'
              justifyContent='center'
              flexDirection='column'
            >
              <input
                type='file'
                id={`${name || title}-image-upload`}
                onChange={onImageInputValueChange}
                onBlur={onBlur ? onBlur : () => {}}
                hidden
              />
              <label htmlFor={`${name || title}-image-upload`}>
                <Box display='flex' justifyContent='center' flexDirection='row'>
                  <Box
                    display='flex'
                    justifyContent='center'
                    flexDirection='column'
                    width='100px'
                    height='100px'
                    bgcolor={theme.palette.background.paper}
                    borderRadius='100%'
                    style={{ cursor: 'pointer' }}
                  >
                    <Box display='flex' justifyContent='center'>
                      <UploadIcon />
                    </Box>
                    <Box display='flex' justifyContent='center'>
                      <Typography variant='body1'>Upload</Typography>
                    </Box>
                  </Box>
                </Box>
              </label>
            </Box>
          </Box>
        )}
      </Box>

      {isLoading && <Typography variant='body2'>Loading...</Typography>}
    </Box>
  )
}
