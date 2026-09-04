import { useParams, useNavigate } from 'react-router-dom';
import ProductCard from '../components/ProductCard';

export default function CategoryPage() {
  const { categoryId } = useParams();
  const navigate = useNavigate();

  const categories = {
    health: {
      title: 'Health & Personal Care',
      image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=600&q=80',
      products: [
        { id: 'h1', title: 'Advanced Whey Protein', price: 45.99, image: 'https://rukminim2.flixcart.com/image/1536/1536/xif0q/protein-supplement/h/q/h/whey-protein-advance-whey-2-lbs-chocolate-adv2chocolate-muscle-original-imahg3qj6rgpzmwf.jpeg?q=90' },
        { id: 'h2', title: 'Smart Yoga Mat', price: 89.00, image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=600&q=80' },
        { id: 'h3', title: 'Organic Skincare Set', price: 120.00, image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=600&q=80' },
        { id: 'h4', title: 'Ergonomic Massage Gun', price: 199.50, image: 'https://cultstore.com/cdn/shop/files/01Withoutname_2.jpg?v=1784633822&width=3000' }
      ]
    },
    fashion: {
      title: 'Fashion',
      image: 'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=600&q=80',
      products: [
        { id: 'f1', title: 'Classic Leather Jacket', price: 189.99, image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&q=80' },
        { id: 'f2', title: 'Designer Sunglasses', price: 145.00, image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600&q=80' },
        { id: 'f3', title: 'Minimalist Sneakers', price: 120.00, image: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=600&q=80' },
        { id: 'f4', title: 'Luxury Chronograph', price: 299.50, image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=600&q=80' }
      ]
    },
    sports: {
      title: 'Sports & Outdoors',
      image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=600&q=80',
      products: [
        { id: 's1', title: 'Performance Running Shoes', price: 109.99, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80' },
        { id: 's2', title: 'Professional Football', price: 34.99, image: 'https://images.unsplash.com/photo-1553778263-73a83bab9b0c?w=600&q=80' },
        { id: 's3', title: 'Cycling Helmet', price: 79.50, image: 'https://www.lifelongindiaonline.com/cdn/shop/files/1_7c867620-b6cd-4c63-adbe-616e5fe4c4e4.jpg?v=1752144831&width=940' },
        { id: 's4', title: 'Outdoor Camping Backpack', price: 119.00, image: 'https://www.trawoc.com/cdn/shop/files/Artboard7_7b9ebdcb-bc88-4756-bb67-542b98b8f89d.jpg?v=1780375869&width=1100' }
      ]
    },
    home: {
      title: 'Home & Kitchen',
      image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=600&q=80',
      products: [
        { id: 'hm1', title: 'Modern Cookware Set', price: 149.99, image: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=600&q=80' },
        { id: 'hm2', title: 'Ceramic Dinnerware Set', price: 79.99, image: 'https://www.claycraftindia.com/cdn/shop/files/DINNERSETPCS_04.jpg?v=1758274132&width=1946' },
        { id: 'hm3', title: 'Electric Coffee Maker', price: 99.50, image: 'https://glenindia.com/cdn/shop/files/7_bb5d2375-c48d-4692-8676-6d4f6cf174d1.jpg?v=1776507554&width=800' },
        { id: 'hm4', title: 'Kitchen Storage Organizer', price: 39.00, image: 'https://www.aboutspace.in/cdn/shop/files/716bmELUT6L_3.jpg?v=1744276037' }
      ]
    },
    electronics: {
      title: 'Electronics',
      image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=600&q=80',
      products: [
        { id: 'e1', title: 'Wireless Noise-Cancelling Headphones', price: 129.99, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80' },
        { id: 'e2', title: 'Smartphone Pro', price: 699.00, image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&q=80' },
        { id: 'e3', title: 'Smart Watch Series 5', price: 199.50, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80' },
        { id: 'e4', title: 'Portable Bluetooth Speaker', price: 89.00, image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600&q=80' }
      ]
    },
    travel: {
      title: 'Travel',
      image: 'https://images.unsplash.com/photo-1553531384-cc64ac80f931?w=600&q=80',
      products: [
        { id: 't1', title: 'Premium Travel Backpack', price: 89.99, image: 'https://www.harissonsbags.com/cdn/shop/files/Catalog-Grey_01_e20b5670-8585-4e79-b849-32368cc6bd5c.webp?v=1759491526&width=2000' },
        { id: 't2', title: 'Hard Shell Luggage', price: 159.00, image: 'https://m.media-amazon.com/images/I/71Yb9sNH4yL._AC_UY1100_.jpg' },
        { id: 't3', title: 'Travel Neck Pillow', price: 29.99, image: 'https://travel-blue.com/wp-content/uploads/2017/12/231blue-L1.jpg' },
        { id: 't4', title: 'Compact Travel Organizer', price: 39.50, image: 'https://m.media-amazon.com/images/I/61FS-o8S6QL._AC_UY1100_.jpg' }
      ]
    },
    'back-to-school': {
      title: 'Back to School',
      image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=600&q=80',
      products: [
        { id: 'b1', title: 'Student Notebook Set', price: 18.99, image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=600&q=80' },
        { id: 'b2', title: 'School Backpack', price: 49.99, image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80' },
        { id: 'b3', title: 'Desk Study Lamp', price: 34.50, image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600&q=80' },
        { id: 'b4', title: 'Stationery Essentials Kit', price: 24.00, image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=600&q=80' }
      ]
    },
    outlets: {
      title: 'Outlets Deals',
      image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&q=80',
      products: [
        { id: 'o1', title: 'Outlet Fashion Picks', price: 59.99, image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&q=80' },
        { id: 'o2', title: 'Discount Sneaker Deal', price: 69.00, image: 'https://static.nike.com/a/images/t_web_pw_592_v2/f_auto/u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/34923bdf-2def-4f8b-9d29-3b708de25726/W+NIKE+V5+RNR.png' },
        { id: 'o3', title: 'Home Essentials Deal', price: 39.50, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBxTgibjm78KkZMqySMUCPORYOlpJqfCObNY7tHAQS5c_9mnvZ36uAZxn3&s=10' },
        { id: 'o4', title: 'Electronics Clearance Pick', price: 99.00, image: 'https://etimg.etb2bimg.com/thumb/msid-114672455,imgsize-612690,width-1200,height=627,overlay-etretail,resizemode-75/consumer-durables-and-information-technology/consumer-electronics/festive-sales-buoyed-by-online-sales-premiumisation-appliance-makers-expect-up-to-30-growth.jpg' }
      ]
    }
  };

  // 1. Decode the URL parameter and standardize it to lowercase to ignore URL junk like %20
  const cleanUrlParam = decodeURIComponent(categoryId || '').toLowerCase().trim();

  // 2. Smart Lookup Engine: Checks if the incoming URL matches either the short key OR the full title
  const matchedKey = Object.keys(categories).find(key => {
    const isShortKeyMatch = key.toLowerCase() === cleanUrlParam;
    const isFullTitleMatch = categories[key].title.toLowerCase() === cleanUrlParam;
    
    // Accommodate for URL mismatch where "&" is swapped for "and"
    const isAmpersandMatch = categories[key].title.toLowerCase().replace('&', 'and') === cleanUrlParam.replace('&', 'and');
    
    return isShortKeyMatch || isFullTitleMatch || isAmpersandMatch;
  });

  // 3. Render the matched category. If they type gibberish into the URL, fallback to health.
  const category = matchedKey ? categories[matchedKey] : categories.health;

  return (
    <main className="pt-[100px] min-h-screen relative">
      
      {/* Floating Back to Home Button */}
      <div className="absolute top-[120px] left-6 md:left-12 z-10">
        <button 
          onClick={() => navigate('/')}
          className="fixed top-32 left-6 z-50 flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 shadow-sm rounded-full text-sm font-bold text-gray-600 hover:text-[#f26a21] hover:shadow-md hover:-translate-y-0.5 transition-all"
        >
          <i className="fa-solid fa-arrow-left"></i> Back to Home
        </button>
      </div>

      <section className="py-[90px] px-6 rounded-3xl mt-5 text-center bg-[#f8f9fa]">
        <h1 className="text-[2.5rem] text-[#111] font-bold mb-2">{category.title}</h1>
        <p className="text-gray-600">Explore top-rated essentials and premium selections.</p>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[30px] p-[40px_24px] max-w-[1400px] mx-auto">
        {category.products.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </section>
    </main>
  );
}