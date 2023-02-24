import FormAddDoctor from '@/components/FormAddDoctor'
import Header from '@/components/Header'
import ListDoctors from '@/components/ListDoctors'



export default function Home() {
  return (
    <div>
    <Header></Header>
    <FormAddDoctor></FormAddDoctor>
    <ListDoctors></ListDoctors>
    </div>
  )
}