export const parseFilterParams = (query) => {
  const { category, ingredients, search } = query;
  const filter = {};
  if (category) {
    filter.category = category;
  }
  if (ingredients) {
    filter.ingredients = ingredients.trim();
  }
  if (search) {
    filter.title = { $regex: search, $options: 'i' };
  }
  return filter;
};
