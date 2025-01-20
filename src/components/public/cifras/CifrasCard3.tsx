import {Card, CardHeader, CardBody, CardFooter, Divider, Link, Image} from "@nextui-org/react";

export default function App() {
  return (
    <Card className="max-w-[400px] bg-white px-4" style={{borderRadius:'0.5rem', borderWidth:'3px', borderColor:'black'}}>
      <CardHeader className="flex gap-3">
        <h4>170</h4>
      </CardHeader>
      <Divider/>
      <CardBody>
        <p>Socios apuntados en nuestra biblioteca</p>
      </CardBody>
      <Divider/>
      <CardFooter>
        <p>Hazte socio para ponerte a leer el monton de libros que tenemos</p>
      </CardFooter>
    </Card>
  );
}