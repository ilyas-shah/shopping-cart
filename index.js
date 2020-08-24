const root = document.querySelector('.root');
const products = JSON.parse(localStorage.getItem('cart'));

const totalItems = document.querySelector('.total__items');
totalItems.textContent = `${products.length} ITEMS`;

const createProduct = (product) => {
  const createElement = (type = 'div', options = {}) => {
    const el = document.createElement(type);
    el.textContent = options.text;
    el.setAttribute('class', options.classList || '');

    if (type === 'img') {
      el.src = options.src;
      el.alt = options.alt || 'Image';
    }

    if (type === 'input') {
      el.value = options.value;
      el.type = options.type || 'text';
    }
    if (type === 'a') {
      el.href = options.href;
    }
    return el;
  };
  const actions = ['EDIT', 'REMOVE', 'SAVE FOR LATER'];
  const productRoot = createElement('div', {
    classList: 'product',
  });

  /* product content */
  const imgContainer = createElement('div', {
    classList: 'img__container',
  });

  const productImage = createElement('img', {
    classList: 'product__image',
    src: product.p_image,
    alt: product.p_alt,
  });

  // append image to its container
  imgContainer.appendChild(productImage);

  const productTitle = createElement('p', {
    text:
      (product.p_name + ' ' + product.p_variation).toUpperCase() || 'My Title',
    classList: 'product__title',
  });

  const productStyle = createElement('p', {
    text: `Style #: ${product.p_style.toUpperCase() || ''}`,
    classList: 'product__style',
  });

  const productColor = createElement('p', {
    text: `Colour: ${product.p_selected_color.name}`,
    classList: 'product__color',
  });

  const productSize = createElement('p', {
    text: product.p_selected_size.code.toUpperCase(),
    classList: 'product__size',
  });

  const inputQty = createElement('input', {
    type: 'number',
    value: product.p_quantity,
  });

  const productQty = createElement('p', {
    classList: 'product__quantity',
  });

  productQty.appendChild(inputQty);

  const productPrice = createElement('p', {
    classList: 'product__cp',
    text: `${product.p_price}`,
  });

  if (product.p_originalprice) {
    createElement('p', {
      classList: 'product_op',
      text: product.p_originalprice,
    });
  }

  const options = createElement('ul', {
    classList: 'product__options',
  });
  actions.forEach((action) => {
    const item = createElement('li', {
      classList: 'option__item',
    });
    const a = createElement('a', {
      href: '#',
      text: action,
      classList: `product__option--${action.toLowerCase()}`,
    });
    item.appendChild(a);

    options.appendChild(item);
  });
  /* product content */

  // product info{
  const productInfo = createElement('div', {
    classList: 'product__info',
  });

  productInfo.appendChild(productTitle);
  productInfo.appendChild(productStyle);
  productInfo.appendChild(productColor);
  productInfo.appendChild(productSize);
  productInfo.appendChild(productQty);
  productInfo.appendChild(productPrice);

  // final product
  productRoot.appendChild(imgContainer);
  productRoot.appendChild(productInfo);
  productRoot.appendChild(options);

  return productRoot;
};

products.forEach((product) => {
  const node = createProduct(product);
  root.appendChild(node);
});
