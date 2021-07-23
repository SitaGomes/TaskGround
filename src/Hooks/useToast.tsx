import toast, { Toaster } from 'react-hot-toast';

const Message = toast

function SliderMessage(){
  return (
    <Toaster
        toastOptions={{
          success: {
            style: {
              borderRadius: "10px",
              backgroundColor: 'green',
              color: "white"
            },
          },
          error: {
            style: {
              borderRadius: "10px",
              backgroundColor: 'red',
              color: "white",
            },
          },
        }}
      />
  )
}

export {Message, SliderMessage}