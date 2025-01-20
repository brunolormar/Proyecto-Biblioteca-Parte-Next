import {Card, CardHeader, CardBody, CardFooter, Divider, Link, Image} from "@nextui-org/react";

export default function App() {
  return (
    <Card className="max-w-[400px] bg-white px-4" style={{borderRadius:'0.5rem', borderWidth:'3px', borderColor:'black'}}>
      <CardHeader className="flex gap-3">
        <h4>318</h4>
      </CardHeader>
      <Divider/>
      <CardBody>
        <p>Autores con sus libros en nuestra biblioteca</p>
      </CardBody>
      <Divider/>
      <CardFooter>
        <p>Grandes nombre en la historia de la literatura</p>
      </CardFooter>
    </Card>
  );
}