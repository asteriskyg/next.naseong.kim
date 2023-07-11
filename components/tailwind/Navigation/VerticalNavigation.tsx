import PopoverButton from '../PopoverButton'

interface ItemsProps {
  name: string;
  description?: string;
  href: string;
  icon: any;
}

export default function VerticalNavigation({ items }: { items: ItemsProps[] }) {
  return (
    <div>
      {items.map((item) => (
        <PopoverButton key={item.name} button={item} />
      ))}
    </div>
  )
}