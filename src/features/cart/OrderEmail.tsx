import {
  Html, Body, Container, Text, Heading, Section, Hr
} from "@react-email/components";
import { type CartItem } from "./store";

export const OrderEmail = ({ items, total }: { items: CartItem[], total: string }) => (
  <Html>
    <Body style={{ fontFamily: 'sans-serif', color: '#333' }}>
      <Container>
        <Heading>New Order Request - Kashmir Books</Heading>
        <Text>You have received a new quote request with the following items:</Text>
        <Section>
          {items.map((item) => (
            <div key={item.id} style={{ marginBottom: '10px' }}>
              <Text><strong>{item.title}</strong> x {item.quantity} - {item.price * item.quantity}€</Text>
            </div>
          ))}
        </Section>
        <Hr />
        <Text style={{ fontSize: '18px', fontWeight: 'bold' }}>Total: {total}</Text>
      </Container>
    </Body>
  </Html>
);