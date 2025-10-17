import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from '@react-email/components';

interface ContactFormEmailProps {
  name: string;
  email: string;
  vehicle: string;
  country: string;
  message: string;
}

export const ContactFormEmail = ({
  name,
  email,
  vehicle,
  country,
  message,
}: ContactFormEmailProps) => (
  <Html>
    <Head />
    <Preview>New vehicle export inquiry from {name}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>🚗 New Export Inquiry</Heading>
        
        <Section style={section}>
          <Text style={label}>Customer Name:</Text>
          <Text style={value}>{name}</Text>
        </Section>

        <Section style={section}>
          <Text style={label}>Email Address:</Text>
          <Text style={value}>
            <a href={`mailto:${email}`} style={link}>{email}</a>
          </Text>
        </Section>

        <Section style={section}>
          <Text style={label}>Vehicle of Interest:</Text>
          <Text style={value}>{vehicle}</Text>
        </Section>

        <Section style={section}>
          <Text style={label}>Destination Country:</Text>
          <Text style={value}>{country}</Text>
        </Section>

        <Hr style={hr} />

        <Section style={section}>
          <Text style={label}>Additional Message:</Text>
          <Text style={messageText}>{message}</Text>
        </Section>

        <Hr style={hr} />

        <Text style={footer}>
          This inquiry was submitted via the We Export Cars contact form.
          <br />
          Reply directly to this email to contact the customer.
        </Text>
      </Container>
    </Body>
  </Html>
);

// Inline styles for email compatibility
const main = {
  backgroundColor: '#f6f9fc',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0 48px',
  marginBottom: '64px',
  maxWidth: '600px',
};

const h1 = {
  color: '#2a3443',
  fontSize: '28px',
  fontWeight: 'bold',
  margin: '40px 0 20px',
  padding: '0 40px',
};

const section = {
  padding: '0 40px',
  marginBottom: '16px',
};

const label = {
  color: '#666',
  fontSize: '12px',
  fontWeight: 'bold',
  textTransform: 'uppercase' as const,
  margin: '0 0 4px',
};

const value = {
  color: '#2a3443',
  fontSize: '16px',
  margin: '0 0 16px',
};

const link = {
  color: '#d10e22',
  textDecoration: 'none',
};

const messageText = {
  color: '#2a3443',
  fontSize: '14px',
  lineHeight: '24px',
  backgroundColor: '#f6f9fc',
  padding: '16px',
  borderRadius: '4px',
  margin: '0',
  whiteSpace: 'pre-wrap' as const,
};

const hr = {
  borderColor: '#e6e6e6',
  margin: '32px 0',
};

const footer = {
  color: '#8898aa',
  fontSize: '12px',
  lineHeight: '16px',
  padding: '0 40px',
};

export default ContactFormEmail;
