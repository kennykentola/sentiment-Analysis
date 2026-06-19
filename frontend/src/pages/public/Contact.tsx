import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function Contact() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Prevent default form submission for MVP
    alert("Message sent! We will get back to you shortly.");
  };

  return (
    <div className="w-full pb-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 pt-24 sm:pt-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl mb-6">Get in Touch</h1>
            <p className="text-lg leading-8 text-zinc-400 mb-8">
              Whether you need to request a custom deployment for your institution or have questions about our methodology, our team is here to help.
            </p>
            
            <div className="space-y-6 text-zinc-300">
              <div className="flex gap-4">
                <div className="font-semibold text-white w-24">Email</div>
                <div>support@sentimenthub.ng</div>
              </div>
              <div className="flex gap-4">
                <div className="font-semibold text-white w-24">Office</div>
                <div>Innovation Hub, Yaba, Lagos</div>
              </div>
              <div className="flex gap-4">
                <div className="font-semibold text-white w-24">Hours</div>
                <div>Mon-Fri, 9am - 5pm WAT</div>
              </div>
            </div>
          </div>
          
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="first-name" className="text-zinc-300">First name</Label>
                  <Input id="first-name" required className="mt-2 bg-zinc-950 border-zinc-800 text-white" />
                </div>
                <div>
                  <Label htmlFor="last-name" className="text-zinc-300">Last name</Label>
                  <Input id="last-name" required className="mt-2 bg-zinc-950 border-zinc-800 text-white" />
                </div>
              </div>
              
              <div>
                <Label htmlFor="email" className="text-zinc-300">Work email</Label>
                <Input id="email" type="email" required className="mt-2 bg-zinc-950 border-zinc-800 text-white" />
              </div>
              
              <div>
                <Label htmlFor="institution" className="text-zinc-300">Institution / Organization</Label>
                <Input id="institution" required className="mt-2 bg-zinc-950 border-zinc-800 text-white" />
              </div>
              
              <div>
                <Label htmlFor="message" className="text-zinc-300">Message</Label>
                <textarea 
                  id="message" 
                  name="message"
                  title="Message"
                  placeholder="How can we help?"
                  rows={4} 
                  required 
                  className="mt-2 block w-full rounded-md border-0 bg-zinc-950 text-white shadow-sm ring-1 ring-inset ring-zinc-800 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3 py-2"
                />
              </div>
              
              <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white">
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
