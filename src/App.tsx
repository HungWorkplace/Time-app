import { Button } from "./components/ui/button"

function App() {
  const show = (text: any) => {
    console.log(text)
  }
  show("ok")
 
  return (
    <div className="text-red-500 font-bold">
      <Button>Click me</Button>
    </div>
  )
}

export default App