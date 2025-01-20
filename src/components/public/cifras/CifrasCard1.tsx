import {Card, CardHeader, CardBody, CardFooter, Divider, Link, Image} from "@nextui-org/react";

export default function App() {
  return (
    <Card className="max-w-[400px] bg-white px-4" style={{borderRadius:'0.5rem', borderWidth:'3px', borderColor:'black'}}>
      <CardHeader className="flex gap-3">
        <h4>1030</h4>
      </CardHeader>
      <Divider/>
      <CardBody>
        <p>Libros a su disposicion en nuestra biblioteca</p>
      </CardBody>
      <Divider/>
      <CardFooter>
        <p>Libros para todos los gustos y edades</p>
      </CardFooter>
    </Card>
  );
}